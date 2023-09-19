<template>
  <div id="admin-dashboard">
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
              <RouterLink :to="'/entry/edit/' + admin_dashboard.fastest_run.id">
                {{ Number(admin_dashboard.fastest_run.speed).toFixed(2) }}
              </RouterLink>
              km/h
              (
              <RouterLink :to="'/admin/user/show/' + admin_dashboard.fastest_run.user.id">
                {{ admin_dashboard.fastest_run.user.name }}
              </RouterLink>
              )
            </strong></p>
            <p>Longest run: <strong>
              <RouterLink :to="'/entry/edit/' + admin_dashboard.longest_run.id">{{
                admin_dashboard.longest_run.distance
              }}
              </RouterLink>
              km
              (
              <RouterLink :to="'/admin/user/show/' + admin_dashboard.longest_run.user.id">
                {{ admin_dashboard.longest_run.user.name }}
              </RouterLink>
              )
            </strong></p>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
export default {

  data () {
    return {}
  },

  computed: {
    ...mapState({
      admin_dashboard: state => state.general.admin_dashboard,
    }),
  },

  mounted () {
    this.loadAdminDashboard()
  },

  methods: {
    ...mapActions([
      'loadAdminDashboard',
    ]),
  },
}
</script>
