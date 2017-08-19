import Vue from 'vue';
import * as Config from '../../config';

const state = {
  users: {
    current_page: 1,
    data: [],
  },
  user: {},
};

const actions = {

  loadUsers({commit, dispatch}, params) {
    commit('LOAD_USERS');

    return new Promise((resolve, reject) => {
      Vue.http.get(Config.apiPath + 'user', {params})
        .then(
          response => {
            commit('LOAD_USERS_OK', response.data.users);
            resolve();
          },
          response => {
            commit('LOAD_USERS_FAIL');
            reject(response.data);
          });
    })
  },

  loadUser({commit, dispatch}, id) {
    commit('LOAD_USER');

    return new Promise((resolve, reject) => {
      Vue.http.get(Config.apiPath + 'user/' + id)
        .then(
          response => {
            commit('LOAD_USER_OK', response.data.user);
            resolve();
          },
          response => {
            commit('LOAD_USER_FAIL');
            reject(response.data);
          });
    });
  },

  updateUser({commit, dispatch}, {id, form}) {
    commit('UPDATE_USER');

    return new Promise((resolve, reject) => {
      Vue.http.post(Config.apiPath + 'user/' + id, {_method: 'PUT', ...form})
        .then(
          response => {
            commit('UPDATE_USER_OK', response.data.user);
            resolve();
          },
          response => {
            commit('UPDATE_USER_FAIL');
            reject(response.data);
          });
    })
  },

  deleteUser({commit, dispatch}, id) {
    commit('DELETE_USER');

    return new Promise((resolve, reject) => {
      Vue.http.post(Config.apiPath + 'user/' + id, {_method: 'DELETE'})
        .then(
          response => {
            commit('DELETE_USER_OK', id);
            resolve();
          },
          response => {
            commit('DELETE_USER_FAIL');
            reject(response.data);
          });
    })
  },

};

const mutations = {

  LOAD_USERS_OK(state, users) {
    state.users = users;
  },

  LOAD_USER_OK(state, user) {
    state.user = user;
  },

  UPDATE_USER_OK(state, user) {
    state.user = user;
  },

};

export default {
  state,
  actions,
  mutations
};
