import Vue from 'vue'
import * as Config from '../../config'
import moment from 'moment-mini'

const state = {
  weekly: {
    year: moment().year(),
    min_year: '',
    max_year: '',
    data: [],
  },
}

const actions = {

  loadWeeklyReport ({commit, dispatch}, params) {
    commit('LOAD_WEEKLY_REPORT')

    return new Promise((resolve, reject) => {
      Vue.http.get(Config.apiPath + 'report/weekly', {params})
        .then(
          response => {
            commit('LOAD_WEEKLY_REPORT_OK', response.data.weekly)
            resolve()
          },
          response => {
            commit('LOAD_WEEKLY_REPORT_FAIL')
            reject(response.data)
          })
    })
  },

}

const mutations = {

  LOAD_WEEKLY_REPORT_OK (state, report) {
    state.weekly = report
  },

}

export default {
  state,
  actions,
  mutations
}
