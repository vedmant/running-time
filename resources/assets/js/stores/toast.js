import { defineStore } from 'pinia'

let maxToastId = 0

export const useToastStore = defineStore('toast', {
  state: () => ({
    messages: [],
  }),

  actions: {
    addToastMessage({ text, type = 'info', dismissAfter = 5000 }) {
      const id = ++maxToastId

      this.messages.push({
        id,
        text,
        type,
        dismissAfter,
      })

      setTimeout(() => {
        this.messages = this.messages.filter(m => m.id !== id)
      }, dismissAfter)
    },

    removeToastMessage(id) {
      this.messages = this.messages.filter(m => m.id !== id)
    },
  },
})
