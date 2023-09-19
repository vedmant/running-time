import { defineStore } from 'pinia'
import axios from 'axios'

export const useGeneralStore = defineStore('general', {
  state: () => ({
    loading: false,
    dashboard: {},
    admin_dashboard: {
      fastest_run: { user: {} },
      longest_run: { user: {} },
    },
  }),

  actions: {
    startLoading() {
      this.loading = true
    },

    stopLoading() {
      this.loading = false
    },

    async loadDashboard() {
      try {
        this.dashboard = await axios.get('/dashboard/data')
      } catch (e) {
        throw new Error(e.response.data)
      }
    },

    async loadAdminDashboard() {
      try {
        this.admin_dashboard = await axios.get('/dashboard/admin-data')
      } catch (e) {
        throw new Error(e.response.data)
      }
    },
  },
})
