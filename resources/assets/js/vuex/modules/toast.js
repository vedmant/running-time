let maxToastId = 0;

const state = {
  messages: [],
};

const getters = {
  toastMessages: (state) => state.messages
};

const actions = {
  addToastMessage({commit}, {text, type = 'info', dismissAfter = 5000}) {
    const id = ++ maxToastId;

    commit('ADD_TOAST_MESSAGE', {
      id,
      text,
      type,
      dismissAfter
    });
    setTimeout(() => commit('REMOVE_TOAST_MESSAGE', id), dismissAfter)
  },

  removeToastMessage({commit}, id) {
    commit('REMOVE_TOAST_MESSAGE', id)
  }
};

const mutations = {
  ADD_TOAST_MESSAGE(state, data) {
    state.messages.push(data);
  },

  REMOVE_TOAST_MESSAGE(state, id) {
    state.messages = state.messages.filter(m => m.id !== id);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
