import axios from 'axios'
import * as Config from '../../config'

const state = {
  entries: {
    current_page: 1,
    data: [],
  },
}

const actions = {

  loadAllEntries({ commit, dispatch }, params) {
    commit('LOAD_ALL_ENTRIES')

    return new Promise((resolve, reject) => {
      axios.get(`${Config.apiPath  }entry/all`, { params })
        .then(
          (response) => {
            commit('LOAD_ALL_ENTRIES_OK', response.data.entries)
            resolve()
          })
        .catch((error) => {
          commit('LOAD_ALL_ENTRIES_FAIL')
          reject(error.response.data)
        })
    })
  },

}

const mutations = {

  LOAD_ALL_ENTRIES_OK(state, entries) {
    state.entries = entries
  },

}

export default {
  state,
  actions,
  mutations,
}
