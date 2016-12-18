import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import createLogger from 'vuex/dist/logger';
import toast from './modules/toast';
import entries from './modules/entries';
import all_entries from './modules/all-entries';
import users from './modules/users';
import global from './modules/global';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const state = {
  me: null, // Logged in user
  dashboard: {},
  admin_dashboard: {
    fastest_run: {user: {}},
    longest_run: {user: {}},
  },
};


const mutations = {

  CHECK_LOGIN_OK (state, user) {
    state.me = user;
  },

  LOGIN_OK (state, user) {
    state.me = user;
  },

  LOGOUT_OK (state) {
    state.me = null;
  },

  REGISTER_OK (state, user) {
    state.me = user;
  },

  UPDATE_PROFILE_OK (state, user) {
    state.me = user;
  },

  LOAD_DASHBOARD_OK (state, dashboard) {
    state.dashboard = dashboard;
  },

  LOAD_ADMIN_DASHBOARD_OK (state, dashboard) {
    state.admin_dashboard = dashboard;
  },

};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  strict: debug,
  plugins: debug ? [createLogger()] : [],
  modules: {
    toast,
    entries,
    all_entries,
    users,
    global,
  }
});
