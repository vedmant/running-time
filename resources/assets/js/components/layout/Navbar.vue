<template>
  <nav class="navbar navbar-default navbar-static-top">
    <div class="container">
      <div class="navbar-header">

        <!-- Collapsed Hamburger -->
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse">
          <span class="sr-only">Toggle Navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>

        <!-- Branding Image -->
        <router-link class="navbar-brand" to="/">Jogging Times</router-link>
      </div>

      <div class="collapse navbar-collapse" id="app-navbar-collapse">
        <!-- Left Side Of Navbar -->
        <ul class="nav navbar-nav">
          &nbsp;
        </ul>

        <ul class="nav navbar-nav navbar-left">
          <li class="github-menu-item">
            <a class="github-button" href="https://github.com/vedmant/jogging-time" data-size="large" data-show-count="true" aria-label="Star vedmant/jogging-time on GitHub">Star</a>
          </li>
        </ul>

        <!-- Right Side Of Navbar -->
        <ul class="nav navbar-nav navbar-right" v-if="me">
          <!-- Authentication Links -->
          <router-link tag="li" to="/dashboard" active-class="active"><a>Dashboad</a></router-link>
          <router-link tag="li" to="/entries" active-class="active"><a>Entries</a></router-link>

          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
              Reports <span class="caret"></span>
            </a>

            <ul class="dropdown-menu" role="menu">
              <router-link tag="li" to="/report/weekly" active-class="active"><a>Weekly</a></router-link>
            </ul>
          </li>

          <router-link v-if="me.role === 'admin' || me.role === 'manager'" tag="li" to="/admin" active-class="active">
            <a>Admin Panel</a></router-link>

          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
              {{ me.name }} <span class="caret"></span>
            </a>

            <ul class="dropdown-menu" role="menu">
              <router-link tag="li" to="/profile" active-class="active"><a>Profile</a></router-link>
              <router-link tag="li" to="/logout" active-class="active"><a>Logout</a></router-link>
            </ul>
          </li>
        </ul>

        <!-- Right Side Of Navbar -->
        <ul class="nav navbar-nav navbar-right" v-else>
          <!-- Authentication Links -->
          <router-link tag="li" to="/login" active-class="active"><a>Login</a></router-link>
          <router-link tag="li" to="/register" active-class="active"><a>Register</a></router-link>
        </ul>

      </div>
    </div>
  </nav>
</template>

<script>
  import { mapState } from 'vuex'

  export default {

    data () {
      return {}
    },

    mounted () {
      this.loadGithubScript()
    },

    computed: {
      ...mapState({
        me: state => state.auth.me,
        route: state => state.route,
      })
    },

    watch: {
      route () {
        this.$forceUpdate() // Tempopary fix for wrong router navigation after login
      }
    },

    methods: {
      loadGithubScript () {
        const script = document.createElement('script')
        script.src = 'https://buttons.github.io/buttons.js'
        document.head.appendChild(script)
      },
    },
  }
</script>
