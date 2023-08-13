<template>
  <nav class="navbar navbar-default navbar-static-top">
    <div class="container">
      <div class="navbar-header">

        <!-- Collapsed Hamburger -->
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse">
          <span class="sr-only">Toggle Navigation</span>
          <span class="icon-bar" />
          <span class="icon-bar" />
          <span class="icon-bar" />
        </button>

        <!-- Branding Image -->
        <RouterLink class="navbar-brand" to="/">Running Times</RouterLink>
      </div>

      <div id="app-navbar-collapse" class="collapse navbar-collapse">
        <!-- Left Side Of Navbar -->
        <ul class="nav navbar-nav">
          &nbsp;
        </ul>

        <ul class="nav navbar-nav navbar-left">
          <li class="github-menu-item">
            <a
              class="github-button"
              href="https://github.com/vedmant/running-time"
              data-size="large"
              data-show-count="true"
              aria-label="Star vedmant/running-time on GitHub"
            >Star</a>
          </li>
        </ul>

        <!-- Right Side Of Navbar -->
        <ul v-if="me" class="nav navbar-nav navbar-right">
          <!-- Authentication Links -->
          <RouterLink v-slot="{ navigate, href, isActive }" custom to="/dashboard">
            <li :class="{active: isActive}">
              <a :href="href" @click="navigate">Dashboad</a>
            </li>
          </RouterLink>
          <RouterLink v-slot="{ navigate, href, isActive }" custom to="/entries">
            <li :class="{active: isActive}">
              <a :href="href" @click="navigate">Entries</a>
            </li>
          </RouterLink>

          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
              Reports <span class="caret" />
            </a>

            <ul class="dropdown-menu" role="menu">
              <RouterLink v-slot="{ navigate, href, isActive }" custom to="/report/weekly">
                <li :class="{active: isActive}">
                  <a :href="href" @click="navigate">Weekly</a>
                </li>
              </RouterLink>
            </ul>
          </li>

          <RouterLink
            v-if="me.role === 'admin' || me.role === 'manager'"
            v-slot="{ navigate, href, isActive }"
            custom
            to="/admin"
          >
            <li :class="{active: isActive}">
              <a :href="href" @click="navigate">Admin Panel</a>
            </li>
          </RouterLink>

          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
              {{ me.name }} <span class="caret" />
            </a>

            <ul class="dropdown-menu" role="menu">
              <RouterLink v-slot="{ navigate, href, isActive }" custom to="/profile">
                <li :class="{active: isActive}">
                  <a :href="href" @click="navigate">Profile</a>
                </li>
              </RouterLink>
              <RouterLink v-slot="{ navigate, href, isActive }" custom to="/logout">
                <li :class="{active: isActive}">
                  <a :href="href" @click="navigate">Logout</a>
                </li>
              </RouterLink>
            </ul>
          </li>
        </ul>

        <!-- Right Side Of Navbar -->
        <ul v-else class="nav navbar-nav navbar-right">
          <!-- Authentication Links -->
          <RouterLink v-slot="{ navigate, href, isActive }" custom to="/login">
            <li :class="{active: isActive}">
              <a :href="href" @click="navigate">Login</a>
            </li>
          </RouterLink>
          <RouterLink v-slot="{ navigate, href, isActive }" custom to="/register">
            <li :class="{active: isActive}">
              <a :href="href" @click="navigate">Register</a>
            </li>
          </RouterLink>
        </ul>

      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'pinia'
import { useAuthStore } from '../../stores/auth'

export default {

  data () {
    return {}
  },

  computed: {
    ...mapState(useAuthStore, ['me']),
  },

  mounted () {
    this.loadGithubScript()
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
