<template>
  <div class="container">
    <h3>Weekly report</h3>
    <hr>

    <div class="panel panel-default">
      <div class="panel-heading">My Performance</div>
      <Line
        :chart-options="{responsive: true, maintainAspectRatio: false}"
        :chart-data="chartData"
        :height="500"
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
import 'chart.js/auto'
import { Line } from 'vue-chartjs'

export default {

  components: {
    Line,
  },

  computed: {

    ...mapState({
      report: state => state.reports.weekly,
    }),

    params () {
      return {
        year: this.report.year,
      }
    },

    chartData () {
      if (! this.report.chart) return {}
      return {
        labels: this.report.chart.map(i => i[0]),
        datasets: [
          {
            label: 'Speed',
            borderColor: '#f87979',
            data: this.report.chart.map(i => i[1]),
            tension: 0.2,
          },
          {
            label: 'Distance',
            borderColor: '#7acbf9',
            data: this.report.chart.map(i => i[2]),
            tension: 0.2,
          },
        ],
      }
    },

  },

  mounted () {
    this.report.data.length || this.loadWeeklyReport(this.params)
  },

  methods: {

    ...mapActions([
      'loadWeeklyReport',
    ]),

    onLoadWeeklyReport (year) {
      this.loadWeeklyReport({ ...this.params, year })
    },
  },
}
</script>
