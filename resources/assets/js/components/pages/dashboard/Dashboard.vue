<template>
  <div id="dashboard" class="container">
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
          <div class="panel-heading">My Performance</div>
          <LineChart
            :chart-options="{ responsive: true, maintainAspectRatio: false }"
            :chart-data="chartData"
            :height="250"
          />
        </div>

        <div class="panel panel-default">
          <div class="panel-heading">Add new Time Record</div>
          <div class="panel-body">
            <EntryForm :form="form" :errors="errors" @onSubmit="onSubmit" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EntryForm from '../entry/partials/Form.vue'
import 'chart.js/auto'
import { Line as LineChart } from 'vue-chartjs'
import { useAuthStore } from '~/stores/auth'
import { mapActions, mapState } from 'pinia'
import { useGeneralStore } from '~/stores/general'
import { useEntriesStore } from '~/stores/entries'
import { useToastStore } from '~/stores/toast'

export default {

  components: {
    EntryForm,
    LineChart,
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
    }
  },

  computed: {
    ...mapState(useAuthStore, ['me']),
    ...mapState(useGeneralStore, ['dashboard']),

    chartData() {
      if (! this.dashboard.week_chart) return {}
      return {
        labels: this.dashboard.week_chart.map(i => i[0]),
        datasets: [
          {
            label: 'Speed',
            borderColor: '#f87979',
            data: this.dashboard.week_chart.map(i => i[1]),
            tension: 0.2,
          },
          {
            label: 'Distance',
            borderColor: '#7acbf9',
            data: this.dashboard.week_chart.map(i => i[2]),
            tension: 0.2,
          },
        ],
      }
    },
  },

  mounted() {
    this.loadDashboard()
  },

  methods: {
    ...mapActions(useGeneralStore, ['loadDashboard']),
    ...mapActions(useEntriesStore, { storeEntry: 'store' }),

    async onSubmit(form) {
      try {
        await this.storeEntry(form)
        useToastStore().addToastMessage({
          text: 'New time record was added!',
          type: 'success',
        })
        this.form = {
          date: '',
          distance: '',
          time_minutes: '00',
          time_seconds: '00',
        }
        this.errors = {}
        this.loadDashboard()
      } catch (e) {
        this.errors = e.errors || {}
      }

    },
  },
}
</script>
