import * as Config from '../../config';

const state = {
  me: null, // Logged in user
};

const actions = {

  checkLogin({commit, dispatch}) {
    commit('CHECK_LOGIN');

    const access_token = localStorage.getItem('access_token');

    if (! access_token) {
      commit('CHECK_LOGIN_FAIL');
      return;
    }

    return new Promise((resolve, reject) => {
      Vue.http.get(Config.apiPath + 'user/me')
        .then(
          response => {
            commit('CHECK_LOGIN_OK', response.data);
            resolve();
          },
          response => {
            localStorage.removeItem('access_token');
            commit('CHECK_LOGIN_FAIL');
            reject(response.data);
          });
    });
  },


  login({commit, dispatch}, form) {
    commit('LOGIN');

    return new Promise((resolve, reject) => {
      Vue.http.post(Config.apiPath + 'auth/login', form)
        .then(
          response => {
            const access_token = response.data.access_token;
            localStorage.setItem('access_token', access_token);

            commit('LOGIN_OK', response.data.user);
            resolve();
          },
          response => {
            commit('LOGIN_FAIL');
            reject(response.data);
          });
    })
  },

  logout({commit, dispatch}) {
    commit('LOGOUT_OK');

    localStorage.removeItem('access_token');
  },

  register({commit, dispatch}, form) {
    commit('REGISTER');

    return new Promise((resolve, reject) => {
      Vue.http.post(Config.apiPath + 'auth/register', form)
        .then(
          response => {
            const access_token = response.data.access_token;
            localStorage.setItem('access_token', access_token);

            commit('REGISTER_OK', response.data.user);
            resolve();
          },
          response => {
            commit('REGISTER_FAIL');
            reject(response.data);
          });
    })
  },

  updateProfile({commit, dispatch}, {id, form}) {
    commit('UPDATE_PROFILE');

    return new Promise((resolve, reject) => {
      Vue.http.post(Config.apiPath + 'user/' + id, {_method: 'PUT', ...form})
        .then(
          response => {
            commit('UPDATE_PROFILE_OK', response.data.user);
            resolve();
          },
          response => {
            commit('UPDATE_PROFILE_FAIL');
            reject(response.data);
          });
    })
  },

};

const mutations = {

  CHECK_LOGIN_OK(state, user) {
    state.me = user;
  },

  LOGIN_OK(state, user) {
    state.me = user;
  },

  LOGOUT_OK(state) {
    state.me = null;
  },

  REGISTER_OK(state, user) {
    state.me = user;
  },

  UPDATE_PROFILE_OK(state, user) {
    state.me = user;
  },

};

export default {
  state,
  actions,
  mutations
};
