<template>
  <div class="container">
    <h3>Administrative panel</h3>
    <hr>

    <div class="row">
      <div class="col-sm-2">
        <ul class="nav nav-pills nav-stacked">
          <router-link tag="li" to="/admin/dashboard" active-class="active"><a>Dashboard</a></router-link>
          <router-link tag="li" to="/admin/users" active-class="active"><a>Users</a></router-link>
          <router-link v-if="me.role == 'admin'" tag="li" to="/admin/entries" active-class="active"><a>Entries</a>
          </router-link>
        </ul>
      </div>
      <div class="col-sm-10">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {

    data() {
      return {};
    },

    computed: {
      ...mapState({
        me: state => state.auth.me,
      })
    },

    methods: {}
  }
</script>
