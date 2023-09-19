import axios from 'axios'
import moment from 'moment-mini'
import * as Config from '../../config'

const state = {
  weekly: {
    year: moment().year(),
    min_year: '',
    max_year: '',
    data: [],
  },
}

const actions = {

  loadWeeklyReport({ commit, dispatch }, params) {
    commit('LOAD_WEEKLY_REPORT')

    return new Promise((resolve, reject) => {
      axios.get(`${Config.apiPath  }report/weekly`, { params })
        .then(
          (response) => {
            commit('LOAD_WEEKLY_REPORT_OK', response.data.weekly)
            resolve()
          })
        .catch((error) => {
          commit('LOAD_WEEKLY_REPORT_FAIL')
          reject(error.response.data)
        })
    })
  },

}

const mutations = {

  LOAD_WEEKLY_REPORT_OK(state, report) {
    state.weekly = report
  },

}

export default {
  state,
  actions,
  mutations,
}
