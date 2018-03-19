import axios from 'axios'
import * as Config from '../../config'

const state = {
  entries: {
    current_page: 1,
    data: [],
  },
  entry: {},
}

const actions = {

  loadEntries ({commit, dispatch}, params) {
    commit('LOAD_ENTRIES')

    return new Promise((resolve, reject) => {
      axios.get(Config.apiPath + 'entry', {params})
        .then(
          response => {
            commit('LOAD_ENTRIES_OK', response.data.entries)
            resolve()
          })
        .catch(error => {
          commit('LOAD_ENTRIES_FAIL')
          reject(error.response.data)
        })
    })
  },

  loadEntry ({commit, dispatch}, id) {
    commit('LOAD_ENTRY')

    return new Promise((resolve, reject) => {
      axios.get(Config.apiPath + 'entry/' + id)
        .then(
          response => {
            commit('LOAD_ENTRY_OK', response.data.entry)
            resolve()
          })
        .catch(error => {
          commit('LOAD_ENTRY_FAIL')
          reject(error.response.data)
        })
    })
  },

  storeEntry ({commit, dispatch}, form) {
    commit('STORE_ENTRY')

    return new Promise((resolve, reject) => {
      axios.post(Config.apiPath + 'entry', form)
        .then(
          response => {
            commit('STORE_ENTRY_OK', response.data.entry)
            resolve()
          })
        .catch(error => {
          commit('STORE_ENTRY_FAIL')
          reject(error.response.data)
        })
    })
  },

  updateEntry ({commit, dispatch}, {id, form}) {
    commit('UPDATE_ENTRY')

    return new Promise((resolve, reject) => {
      axios.post(Config.apiPath + 'entry/' + id, {_method: 'PUT', ...form})
        .then(
          response => {
            commit('UPDATE_ENTRY_OK', response.data.entry)
            resolve()
          })
        .catch(error => {
          commit('UPDATE_ENTRY_FAIL')
          reject(error.response.data)
        })
    })
  },

  deleteEntry ({commit, dispatch}, id) {
    commit('DELETE_ENTRY')

    return new Promise((resolve, reject) => {
      axios.post(Config.apiPath + 'entry/' + id, {_method: 'DELETE'})
        .then(
          response => {
            commit('DELETE_ENTRY_OK', id)
            resolve()
          })
        .catch(error => {
          commit('DELETE_ENTRY_FAIL')
          reject(error.response.data)
        })
    })
  }

}

const mutations = {

  LOAD_ENTRIES_OK (state, entries) {
    state.entries = entries
  },

  LOAD_ENTRY_OK (state, entry) {
    state.entry = entry
  },

}

export default {
  state,
  actions,
  mutations
}
