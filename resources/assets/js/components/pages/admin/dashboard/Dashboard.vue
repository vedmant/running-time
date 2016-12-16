<template>
  <div>
    <h3>Dashboard</h3>
    <hr>

    <div class="row">
      <div class="col-sm-6">

        <div class="panel panel-default">
          <div class="panel-heading">Users Stats</div>
          <div class="panel-body">
            <p>Total users: <strong>{{ admin_dashboard.total_users }}</strong></p>
            <p>New users this week: <strong>{{ admin_dashboard.new_users_this_week }}</strong></p>
            <p>New users this month: <strong>{{ admin_dashboard.new_users_this_month }}</strong></p>
          </div>
        </div>

      </div>

      <div class="col-sm-6">

        <div class="panel panel-default">
          <div class="panel-heading">Entries Stats</div>
          <div class="panel-body">
            <p>Total entries: <strong>{{ admin_dashboard.total_entries }}</strong></p>
            <p>Average entries per user: <strong>{{ admin_dashboard.avg_entries_per_user }}</strong></p>
            <p>Fastest run: <strong>
              <router-link :to="'/entry/edit/' + admin_dashboard.fastest_run.id">{{ Number(admin_dashboard.fastest_run.speed).toFixed(2) }}</router-link> km/h
              (<router-link :to="'/admin/user/show/' + admin_dashboard.fastest_run.user.id">{{ admin_dashboard.fastest_run.user.name }}</router-link>)
            </strong></p>
            <p>Longest run: <strong>
              <router-link :to="'/entry/edit/' + admin_dashboard.longest_run.id">{{ admin_dashboard.longest_run.distance }}</router-link> km
              (<router-link :to="'/admin/user/show/' + admin_dashboard.longest_run.user.id">{{ admin_dashboard.longest_run.user.name }}</router-link>)
            </strong></p>
          </div>
        </div>

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

  mounted() {
    this.loadAdminDashboard();
  },

  computed: {
    ...mapState([
      'admin_dashboard',
    ])
  },

  methods: {
    ...mapActions([
      'loadAdminDashboard',
    ])
  }
}
</script>
