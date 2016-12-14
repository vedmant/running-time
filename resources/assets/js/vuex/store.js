import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const state = {
  user: null, // Logged in user
  loading: false,
  error: '',
  entries: {
    data: [],
  },
};

const mutations = {

  CHECK_LOGIN (state) {
    state.loading = true;
  },

  CHECK_LOGIN_OK (state, user) {
    state.user = user;
    state.loading = false;
  },

  CHECK_LOGIN_FAIL (state) {
    state.loading = false;
  },

  LOGIN (state) {
    state.loading = true;
  },

  LOGIN_OK (state, user) {
    state.user = user;
    state.loading = false;
  },

  LOGIN_FAIL (state) {
    state.loading = false;
  },

  LOGOUT_OK (state) {
    state.user = null;
  },

  REGISTER (state) {
    state.loading = true;
  },

  REGISTER_OK (state, user) {
    state.user = user;
    state.loading = false;
  },

  REGISTER_FAIL (state) {
    state.loading = false;
  },

  LOAD_ENTRIES (state) {
    state.loading = true;
  },

  LOAD_ENTRIES_OK (state, entries) {
    state.entries = entries;
    state.loading = false;
  },

  LOAD_ENTRIES_FAIL (state) {
    state.loading = false;
  },

  STORE_ENTRY (state) {
    state.loading = true;
  },

  STORE_ENTRY_OK (state, entry) {
    state.entries = state.entries.data.unshift(entry);
    state.loading = false;
  },

  STORE_ENTRY_FAIL (state) {
    state.loading = false;
  },

};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
