import { defineStore } from 'pinia'
import axios from 'axios'

export const useAllEntriesStore = defineStore('all-entries', {
  state: () => ({
    entries: {
      current_page: 1,
      data: [],
    },
  }),

  actions: {
    async load(params) {
      try {
        const resp = axios.get('/user/me', { params })
        this.entries = resp.entries
      } catch (e) {
        throw new Error(e.response.data)
      }
    },
  },
})
