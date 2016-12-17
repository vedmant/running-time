import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import createLogger from 'vuex/dist/logger';
import toast from './modules/toast';
import entries from './modules/entries';
import all_entries from './modules/all-entries';
import users from './modules/users';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const state = {
  me: null, // Logged in user
  loading: false,
  dashboard: {},
  admin_dashboard: {
    fastest_run: {user: {}},
    longest_run: {user: {}},
  },
};


const mutations = {

  STOP_LOADING (state) {
    state.loading = false;
  },

  CHECK_LOGIN (state) {
    state.loading = true;
  },

  CHECK_LOGIN_OK (state, user) {
    state.me = user;
    state.loading = false;
  },

  CHECK_LOGIN_FAIL (state) {
    state.loading = false;
  },

  LOGIN (state) {
    state.loading = true;
  },

  LOGIN_OK (state, user) {
    state.me = user;
    state.loading = false;
  },

  LOGIN_FAIL (state) {
    state.loading = false;
  },

  LOGOUT_OK (state) {
    state.me = null;
  },

  REGISTER (state) {
    state.loading = true;
  },

  REGISTER_OK (state, user) {
    state.me = user;
    state.loading = false;
  },

  REGISTER_FAIL (state) {
    state.loading = false;
  },

  UPDATE_PROFILE (state) {
    state.loading = true;
  },

  UPDATE_PROFILE_OK (state, user) {
    state.me = user;
    state.loading = false;
  },

  UPDATE_PROFILE_FAIL (state) {
    state.loading = false;
  },

  LOAD_DASHBOARD (state) {
    state.loading = true;
  },

  LOAD_DASHBOARD_OK (state, dashboard) {
    state.dashboard = dashboard;
    state.loading = false;
  },

  LOAD_DASHBOARD_FAIL (state) {
    state.loading = false;
  },

  LOAD_ADMIN_DASHBOARD (state) {
    state.loading = true;
  },

  LOAD_ADMIN_DASHBOARD_OK (state, dashboard) {
    state.admin_dashboard = dashboard;
    state.loading = false;
  },

  LOAD_ADMIN_DASHBOARD_FAIL (state) {
    state.loading = false;
  },

  LOAD_ENTRIES (state) {
    state.loading = true;
  },

  LOAD_ENTRIES_OK (state, entries) {
    state.loading = false;
  },

  LOAD_ENTRIES_FAIL (state) {
    state.loading = false;
  },

  LOAD_ALL_ENTRIES (state) {
    state.loading = true;
  },

  LOAD_ALL_ENTRIES_OK (state, entries) {
    state.loading = false;
  },

  LOAD_ALL_ENTRIES_FAIL (state) {
    state.loading = false;
  },

  LOAD_ENTRY (state) {
    state.loading = true;
  },

  LOAD_ENTRY_OK (state, entry) {
    state.loading = false;
  },

  LOAD_ENTRY_FAIL (state) {
    state.loading = false;
  },

  STORE_ENTRY (state) {
    state.loading = true;
  },

  STORE_ENTRY_OK (state, entry) {
    state.loading = false;
  },

  STORE_ENTRY_FAIL (state) {
    state.loading = false;
  },

  UPDATE_ENTRY (state) {
    state.loading = true;
  },

  UPDATE_ENTRY_OK (state, entry) {
    state.loading = false;
  },

  UPDATE_ENTRY_FAIL (state) {
    state.loading = false;
  },

  DELETE_ENTRY (state) {
    state.loading = true;
  },

  DELETE_ENTRY_OK (state, entry) {
    state.loading = false;
  },

  DELETE_ENTRY_FAIL (state) {
    state.loading = false;
  },

  LOAD_USERS (state) {
    state.loading = true;
  },

  LOAD_USERS_OK (state, users) {
    state.loading = false;
  },

  LOAD_USERS_FAIL (state) {
    state.loading = false;
  },

  LOAD_USER (state) {
    state.loading = true;
  },

  LOAD_USER_OK (state, user) {
    state.loading = false;
  },

  LOAD_USER_FAIL (state) {
    state.loading = false;
  },

  UPDATE_USER (state) {
    state.loading = true;
  },

  UPDATE_USER_OK (state, user) {
    state.loading = false;
  },

  UPDATE_USER_FAIL (state) {
    state.loading = false;
  },

  DELETE_USER (state) {
    state.loading = true;
  },

  DELETE_USER_OK (state, entry) {
    state.loading = false;
  },

  DELETE_USER_FAIL (state) {
    state.loading = false;
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
  }
});
