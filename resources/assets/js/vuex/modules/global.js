import { makeMutations } from '../helpers';

const state = {
  loading: false,
};

const actions = {

  stopLoading ({commit}) {
    commit('STOP_LOADING');
  },

};

const mutations = {

  ...makeMutations([
    'CHECK_LOGIN',
    'LOGIN',
    'REGISTER',
    'UPDATE_PROFILE',
    'LOAD_DASHBOARD',
    'LOAD_ADMIN_DASHBOARD',
    'LOAD_ENTRIES',
    'LOAD_ALL_ENTRIES',
    'LOAD_ENTRY',
    'STORE_ENTRY',
    'UPDATE_ENTRY',
    'DELETE_ENTRY',
    'LOAD_USERS',
    'LOAD_USER',
    'UPDATE_USER',
    'DELETE_USER',
  ], (state) => {
    state.loading = true;
  }),

  ...makeMutations([
    'STOP_LOADING',
    'CHECK_LOGIN_OK',
    'CHECK_LOGIN_FAIL',
    'LOGIN_OK',
    'LOGIN_FAIL',
    'REGISTER_OK',
    'REGISTER_FAIL',
    'UPDATE_PROFILE_OK',
    'UPDATE_PROFILE_FAIL',
    'LOAD_DASHBOARD_OK',
    'LOAD_DASHBOARD_FAIL',
    'LOAD_ADMIN_DASHBOARD_OK',
    'LOAD_ADMIN_DASHBOARD_FAIL',
    'LOAD_ENTRIES_OK',
    'LOAD_ENTRIES_FAIL',
    'LOAD_ALL_ENTRIES_OK',
    'LOAD_ALL_ENTRIES_FAIL',
    'LOAD_ENTRY_OK',
    'LOAD_ENTRY_FAIL',
    'STORE_ENTRY_OK',
    'STORE_ENTRY_FAIL',
    'UPDATE_ENTRY_OK',
    'UPDATE_ENTRY_FAIL',
    'DELETE_ENTRY_OK',
    'DELETE_ENTRY_FAIL',
    'LOAD_USERS_OK',
    'LOAD_USERS_FAIL',
    'LOAD_USER_OK',
    'LOAD_USER_FAIL',
    'UPDATE_USER_OK',
    'UPDATE_USER_FAIL',
    'DELETE_USER_OK',
    'DELETE_USER_FAIL',
  ], (state) => {
    state.loading = false;
  }),

};

export default {
  state,
  actions,
  mutations
};
