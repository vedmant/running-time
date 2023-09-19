import axios from 'axios'
import * as Config from '../../config'

const state = {
  me: null, // Logged in user
  accessToken: localStorage.getItem('access_token'),
  authChecked: false,
}

const actions = {

  checkLogin({ commit }) {
    commit('CHECK_LOGIN')

    return new Promise((resolve, reject) => {
      axios.get(`${Config.apiPath  }user/me`)
        .then(
          (response) => {
            commit('CHECK_LOGIN_OK', response.data)
            resolve()
          })
        .catch((error) => {
          commit('CHECK_LOGIN_FAIL')
          reject(error.response.data)
        })
    })
  },

  login({ commit, dispatch }, form) {
    commit('LOGIN')

    return new Promise((resolve, reject) => {
      axios.post(`${Config.apiPath  }auth/login`, form)
        .then(
          (response) => {
            const accessToken = response.data.access_token
            localStorage.setItem('access_token', accessToken)

            commit('LOGIN_OK', { user: response.data.user, accessToken })
            resolve()
          })
        .catch((error) => {
          commit('LOGIN_FAIL')
          reject(error.response.data)
        })
    })
  },

  logout({ commit }) {
    commit('LOGOUT_OK')

    localStorage.removeItem('access_token')
  },

  register({ commit, dispatch }, form) {
    commit('REGISTER')

    return new Promise((resolve, reject) => {
      axios.post(`${Config.apiPath  }auth/register`, form)
        .then(
          (response) => {
            const accessToken = response.data.access_token
            localStorage.setItem('access_token', accessToken)

            commit('REGISTER_OK', { user: response.data.user, accessToken })
            resolve()
          })
        .catch((error) => {
          commit('REGISTER_FAIL')
          reject(error.response.data)
        })
    })
  },

  updateProfile({ commit, dispatch }, { id, form }) {
    commit('UPDATE_PROFILE')

    return new Promise((resolve, reject) => {
      axios.post(`${Config.apiPath  }user/${  id}`, { _method: 'PUT', ...form })
        .then(
          (response) => {
            commit('UPDATE_PROFILE_OK', response.data.user)
            resolve()
          })
        .catch((error) => {
          commit('UPDATE_PROFILE_FAIL')
          reject(error.response.data)
        })
    })
  },

}

const mutations = {

  CHECK_LOGIN_OK(state, user) {
    state.me = user
    state.authChecked = true
  },

  CHECK_LOGIN_FAIL(state) {
    state.accessToken = null
    state.authChecked = true
  },

  LOGIN_OK(state, { user, accessToken }) {
    state.me = user
    state.accessToken = accessToken
  },

  LOGOUT_OK(state) {
    state.me = null
    state.accessToken = null
  },

  REGISTER_OK(state, { user, accessToken }) {
    state.me = user
    state.accessToken = accessToken
  },

  UPDATE_PROFILE_OK(state, user) {
    state.me = user
  },

}

export default {
  state,
  actions,
  mutations,
}
