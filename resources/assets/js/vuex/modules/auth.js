import axios from 'axios'
import * as Config from '../../config'

const state = {
  me: null, // Logged in user
}

const actions = {

  checkLogin ({commit, dispatch}) {
    commit('CHECK_LOGIN')

    const accessToken = localStorage.getItem('access_token')

    return new Promise((resolve, reject) => {
      if (! accessToken) {
        commit('CHECK_LOGIN_FAIL')
        return reject(new Error('No access token stored'))
      }

      axios.get(Config.apiPath + 'user/me')
        .then(
          response => {
            commit('CHECK_LOGIN_OK', response.data)
            resolve()
          })
        .catch(error => {
          localStorage.removeItem('access_token')
          commit('CHECK_LOGIN_FAIL')
          reject(error.response.data)
        })
    })
  },


  login ({commit, dispatch}, form) {
    commit('LOGIN')

    return new Promise((resolve, reject) => {
      axios.post(Config.apiPath + 'auth/login', form)
        .then(
          response => {
            const accessToken = response.data.access_token
            localStorage.setItem('access_token', accessToken)

            commit('LOGIN_OK', response.data.user)
            resolve()
          })
        .catch(error => {
          commit('LOGIN_FAIL')
          reject(error.response.data)
        })
    })
  },

  logout ({commit, dispatch}) {
    commit('LOGOUT_OK')

    localStorage.removeItem('access_token')
  },

  register ({commit, dispatch}, form) {
    commit('REGISTER')

    return new Promise((resolve, reject) => {
      axios.post(Config.apiPath + 'auth/register', form)
        .then(
          response => {
            const accessToken = response.data.access_token
            localStorage.setItem('access_token', accessToken)

            commit('REGISTER_OK', response.data.user)
            resolve()
          })
        .catch(error => {
          commit('REGISTER_FAIL')
          reject(error.response.data)
        })
    })
  },

  updateProfile ({commit, dispatch}, {id, form}) {
    commit('UPDATE_PROFILE')

    return new Promise((resolve, reject) => {
      axios.post(Config.apiPath + 'user/' + id, {_method: 'PUT', ...form})
        .then(
          response => {
            commit('UPDATE_PROFILE_OK', response.data.user)
            resolve()
          })
        .catch(error => {
          commit('UPDATE_PROFILE_FAIL')
          reject(error.response.data)
        })
    })
  },

}

const mutations = {

  CHECK_LOGIN_OK (state, user) {
    state.me = user
  },

  LOGIN_OK (state, user) {
    state.me = user
  },

  LOGOUT_OK (state) {
    state.me = null
  },

  REGISTER_OK (state, user) {
    state.me = user
  },

  UPDATE_PROFILE_OK (state, user) {
    state.me = user
  },

}

export default {
  state,
  actions,
  mutations
}
