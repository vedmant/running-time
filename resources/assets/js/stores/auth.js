import { defineStore } from 'pinia'
import axios from 'axios'
import * as Config from '../config'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    me: null, // Logged in user
    accessToken: localStorage.getItem('access_token'),
    authChecked: false,
  }),

  actions: {
    async checkLogin () {
      try {
        const resp = axios.get(Config.apiPath + 'user/me')
        this.me = resp.data
        this.authChecked = true
      } catch (e) {
        throw Error(e.response.data)
      }
    },

    async login (form) {
      try {
        const resp = axios.get(Config.apiPath + 'auth/login', form)
        const accessToken = resp.data.access_token
        localStorage.setItem('access_token', accessToken)
        this.me = resp.data.user
        this.accessToken = accessToken
      } catch (e) {
        throw Error(e.response.data)
      }
    },

    logout () {
      localStorage.removeItem('access_token')
      this.me = null
      this.accessToken = null
    },

    async register (form) {
      try {
        const resp = axios.post(Config.apiPath + 'auth/register', form)
        const accessToken = resp.data.access_token
        localStorage.setItem('access_token', accessToken)
        this.me = resp.data.user
        this.accessToken = accessToken
      } catch (e) {
        throw Error(e.response.data)
      }
    },

    async updateProfile ({ id, form }) {
      try {
        const resp = axios.post(Config.apiPath + 'user/' + id, { _method: 'PUT', ...form })
        this.me = resp.data.user
      } catch (e) {
        throw Error(e.response.data)
      }
    },
  },
})
