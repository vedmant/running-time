import Vue from 'vue';

const apiPath = '/api/v1/';


/* ========================================================================= *\
 * Simple Actions
\* ========================================================================= */

function makeAction(type) {
  return ({commit}, ...args) => commit(type, ...args)
}

export const clearError = makeAction('CLEAR_ERROR');
export const stopLoading = makeAction('STOP_LOADING');


/* ========================================================================= *\
 * Auth Actions
\* ========================================================================= */

export const checkLogin = ({commit, dispatch}) => {
  commit('CHECK_LOGIN');

  const access_token = localStorage.getItem('access_token');

  if ( ! access_token) {
    commit('CHECK_LOGIN_FAIL');
    return;
  }

  return new Promise((resolve, reject) => {
    Vue.http.get(apiPath + 'user/me')
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
};


export const login = ({commit, dispatch}, form) => {
  commit('LOGIN');

  return new Promise((resolve, reject) => {
    Vue.http.post(apiPath + 'auth/login', form)
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
};


export const logout = ({commit, dispatch}) => {
  commit('LOGOUT_OK');

  localStorage.removeItem('access_token');
};


export const register = ({commit, dispatch}, form) => {
  commit('REGISTER');

  return new Promise((resolve, reject) => {
    Vue.http.post(apiPath + 'auth/register', form)
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
};

export const updateProfile = ({commit, dispatch}, {id, form}) => {
  commit('UPDATE_PROFILE');

  return new Promise((resolve, reject) => {
    Vue.http.post(apiPath + 'user/' + id, {_method: 'PUT', ...form})
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
};


/* ========================================================================= *\
 * Dashboard Actions
\* ========================================================================= */

export const loadDashboard = ({commit, dispatch}) => {
  commit('LOAD_DASHBOARD');

  return new Promise((resolve, reject) => {
    Vue.http.get(apiPath + 'dashboard/data')
      .then(
        response => {
          commit('LOAD_DASHBOARD_OK', response.data);
          resolve();
        },
        response => {
          commit('LOAD_DASHBOARD_FAIL');
          reject(response.data);
        });
  })
};


/* ========================================================================= *\
 * Entries Actions
\* ========================================================================= */

export const loadEntries = ({commit, dispatch}, params) => {
  commit('LOAD_ENTRIES');

  return new Promise((resolve, reject) => {
    Vue.http.get(apiPath + 'entry', {params})
      .then(
        response => {
          commit('LOAD_ENTRIES_OK', response.data.entries);
          resolve();
        },
          response => {
          commit('LOAD_ENTRIES_FAIL');
          reject(response.data);
        });
  })
};

export const storeEntry = ({commit, dispatch}, form) => {
  commit('STORE_ENTRY');

  return new Promise((resolve, reject) => {
    Vue.http.post(apiPath + 'entry', form)
      .then(
        response => {
          commit('STORE_ENTRY_OK', response.data.entry);
          resolve();
        },
        response => {
          commit('STORE_ENTRY_FAIL');
          reject(response.data);
        });
  })
};

export const updateEntry = ({commit, dispatch}, {id, form}) => {
  commit('UPDATE_ENTRY');

  return new Promise((resolve, reject) => {
    Vue.http.post(apiPath + 'entry/' + id, {_method: 'PUT', ...form})
      .then(
        response => {
          commit('UPDATE_ENTRY_OK', response.data.entry);
          resolve();
        },
        response => {
          commit('UPDATE_ENTRY_FAIL');
          reject(response.data);
        });
  })
};

export const deleteEntry = ({commit, dispatch}, id) => {
  commit('DELETE_ENTRY');

  return new Promise((resolve, reject) => {
    Vue.http.post(apiPath + 'entry/' + id, {_method: 'DELETE'})
      .then(
        response => {
          commit('DELETE_ENTRY_OK', id);
          resolve();
        },
        response => {
          commit('DELETE_ENTRY_FAIL');
          reject(response.data);
        });
  })
};


/* ========================================================================= *\
 * Users Actions
\* ========================================================================= */

export const loadUsers = ({commit, dispatch}, params) => {
  commit('LOAD_USERS');

  return new Promise((resolve, reject) => {
    Vue.http.get(apiPath + 'user', {params})
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
};


export const showUser = ({commit, dispatch}, id) => {
  commit('SHOW_USER');

  return new Promise((resolve, reject) => {
    Vue.http.get(apiPath + 'user/' + id)
      .then(
        response => {
          commit('SHOW_USER_OK', response.data.user);
          resolve();
        },
        response => {
          commit('SHOW_USER_FAIL');
          reject(response.data);
        });
  });
};

export const updateUser = ({commit, dispatch}, {id, form}) => {
  commit('UPDATE_USER');

  return new Promise((resolve, reject) => {
    Vue.http.post(apiPath + 'user/' + id, {_method: 'PUT', ...form})
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
};

export const deleteUser = ({commit, dispatch}, id) => {
  commit('DELETE_USER');

  return new Promise((resolve, reject) => {
    Vue.http.post(apiPath + 'user/' + id, {_method: 'DELETE'})
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
};