<template>
  <div class="container">
    <h3>Weekly report</h3>
    <hr>

    <div class="panel panel-default">
      <vue-chart
        chart-type="LineChart"
        :columns="columns"
        :rows="report.chart"
        :options="options"
      />
    </div>

    <div class="panel panel-default">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Week</th>
            <th>Avg. Speed</th>
            <th>Avg. Distance</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in report.data" :key="index">
            <td>{{ formatDate(row.week_start) + ' - ' + formatDate(row.week_end) }} ({{ row.week }})</td>
            <td>{{ Number(row.avg_speed).toFixed(2) }} km/h</td>
            <td>{{ Number(row.avg_distance).toFixed(2) }} min/km</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="text-right">
      <ul class="pagination marginpulltop15">
        <li v-for="year in range(report.max_year, report.min_year)" :key="year" :class="{active: year == report.year}">
          <a href="#" @click.prevent="onLoadWeeklyReport(year)">{{ year }}</a>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {

    data () {
      return {
        columns: [{
          'type': 'string',
          'label': 'Week'
        }, {
          'type': 'number',
          'label': 'Avg. Speed'
        }, {
          'type': 'number',
          'label': 'Avg. Distance'
        }],
        options: {
          title: 'My Performance',
          height: 500,
          curveType: 'function',
          vAxis: {title: 'Speed, Pace'},
          hAxis: {title: 'Week'}
        },
      }
    },

    computed: {

      ...mapState({
        report: state => state.reports.weekly,
      }),

      params () {
        return {
          year: this.report.year,
        }
      }

    },

    mounted () {
      this.report.data.length || this.loadWeeklyReport(this.params)
    },

    methods: {

      ...mapActions([
        'loadWeeklyReport',
      ]),

      onLoadWeeklyReport (year) {
        this.loadWeeklyReport({...this.params, year})
      },
    }
  }
</script>
