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

  LOGIN_OK (state) {
    state.loading = false;
  },

  LOGIN_FAIL (state, error) {
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

};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
