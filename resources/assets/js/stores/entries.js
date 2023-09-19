import { defineStore } from 'pinia'
import axios from 'axios'

export const useEntriesStore = defineStore('entries', {
  state: () => ({
    entries: {
      current_page: 1,
      data: [],
    },
    entry: {},
  }),

  actions: {
    async loadAll(params) {
      try {
        const resp = await axios.get('/entry', { params })
        this.entries = resp.entries
      } catch (e) {
        throw new Error(e.response.data)
      }
    },

    async load(id) {
      try {
        const resp = await axios.get(`/entry/${id}`)
        this.entry = resp.entry
      } catch (e) {
        throw new Error(e.response.data)
      }
    },

    async store({ id, form }) {
      try {
        const resp = await axios.post(`/entry/${id}`, { _method: 'PUT', ...form })
        this.entry = resp.entry
      } catch (e) {
        throw new Error(e.response.data)
      }
    },


    async delete(id) {
      try {
        await axios.post(`/entry/${id}`, { _method: 'DELETE', ...form })
      } catch (e) {
        throw new Error(e.response.data)
      }
    },
  },
})
