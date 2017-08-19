import Vue from 'vue';
import * as Config from '../../config';

const state = {
  entries: {
    current_page: 1,
    data: [],
  },
};

const actions = {

  loadAllEntries({commit, dispatch}, params) {
    commit('LOAD_ALL_ENTRIES');

    return new Promise((resolve, reject) => {
      Vue.http.get(Config.apiPath + 'entry/all', {params})
        .then(
          response => {
            commit('LOAD_ALL_ENTRIES_OK', response.data.entries);
            resolve();
          },
          response => {
            commit('LOAD_ALL_ENTRIES_FAIL');
            reject(response.data);
          });
    })
  },

};

const mutations = {

  LOAD_ALL_ENTRIES_OK(state, entries) {
    state.entries = entries;
  },

};

export default {
  state,
  actions,
  mutations
};
