<template>
  <div class="container">
    <h3>Dashboard</h3>
    <hr>

    <div class="row">
      <div class="col-sm-6">

        <div class="panel panel-default">
          <div class="panel-heading">This week</div>
          <div class="panel-body">
            <p>Records: <strong>{{ dashboard.weekly_count }}</strong></p>
            <p>Average speed: <strong>{{ Number(dashboard.weekly_avg_speed).toFixed(2) }} km/h</strong></p>
            <p>Average pace: <strong>{{ Number(dashboard.weekly_avg_pace).toFixed(2) }} min/km</strong></p>
          </div>
        </div>

        <div class="panel panel-default">
          <div class="panel-heading">Best results</div>
          <div class="panel-body">
            <p>Best speed: <strong>{{ Number(dashboard.max_speed).toFixed(2) }} km/h</strong></p>
            <p>Longest distance: <strong>{{ dashboard.max_distance }} km</strong></p>
            <p>Longest run: <strong>{{ dashboard.max_time }}</strong></p>
          </div>
        </div>

      </div>
      <div class="col-sm-6">

        <div class="panel panel-default">
          <vue-chart
            :chart-type="LineChart"
            :columns="columns"
            :rows="this.dashboard.week_chart"
            :options="options"
          ></vue-chart>
        </div>

        <div class="panel panel-default">
          <div class="panel-heading">Add new Time Record</div>
          <div class="panel-body">
            <entry-form @onSubmit="onSubmit" :form="form" :errors="errors"></entry-form>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';

export default {

  components: {
    'entry-form': require('./../entry/partials/Form.vue'),
  },


  data() {
    return {
      errors: {},
      form: {
        date: '',
        distance: '',
        time_hours: '00',
        time_minutes: '00',
        time_seconds: '00',
      },
      columns: [{
        'type': 'string',
        'label': 'Date'
      }, {
        'type': 'number',
        'label': 'Speed'
      }, {
        'type': 'number',
        'label': 'Distance'
      }],
      options: {
        title: 'My Performance',
        height: 300,
        curveType: 'function'
      },
    };
  },

  mounted() {
    this.loadDashboard();
  },

  computed: {
    ...mapState({
      me: state => state.auth.me,
      dashboard: state => state.general.dashboard,
    }),
  },

  methods: {
    ...mapActions([
      'loadDashboard',
      'storeEntry',
      'addToastMessage',
    ]),

    onSubmit(form) {
      this.storeEntry(form)
        .then(() => {
          this.loadDashboard();
          this.addToastMessage({
            text: 'New time record was added!',
            type: 'success'
          });
          this.form = {
            date: '',
            distance: '',
            time_minutes: '00',
            time_seconds: '00',
          };
          this.errors = {};
        })
        .catch((data) => { this.errors = data.validation || {} });
    },
  }
}
</script>
