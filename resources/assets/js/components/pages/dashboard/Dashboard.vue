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
            <p>Longest run: <strong>{{ max_time }}</strong></p>
          </div>
        </div>

      </div>
      <div class="col-sm-6">

        <div class="panel panel-default">
          <vue-chart
            :chart-type="LineChart"
            :columns="columns"
            :rows="rows"
            :options="options"
          ></vue-chart>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';

export default {

  data() {
    return {
      columns: [{
        'type': 'string',
        'label': 'Date'
      }, {
        'type': 'number',
        'label': 'Speed'
      }],
      rows: [],
      options: {
        title: 'My Speed Performance',
//        hAxis: {
//          title: 'Year',
//          minValue: '2004',
//          maxValue: '2007'
//        },
//        vAxis: {
//          title: '',
//          minValue: 300,
//          maxValue: 1200
//        },
//        width: 900,
        height: 300,
        curveType: 'function'
      },
    };
  },

  mounted() {
    this.loadDashboard().then(() => {
      this.rows = this.dashboard.week_chart;
    });
  },

  computed: {
    ...mapState([
      'user',
      'dashboard',
    ]),

    max_time() {
      const duration = moment.duration(parseInt(this.dashboard.max_time), 'seconds');
      const hours = Math.floor(duration.asHours());

      return (hours ? hours + ':' : '')
        + _.padStart(duration.minutes(), 2, '0')
        + ':' + _.padStart(duration.seconds(), 2, '0');
    }
  },

  methods: {
    ...mapActions([
      'loadDashboard'
    ])
  }
}
</script>
