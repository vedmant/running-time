import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'

import router from './router' // vue-router instance
import App from './components/App.vue'
import Navbar from './components/layout/Navbar.vue'
import Spinner from './components/layout/Spinner.vue'
import Toast from './components/layout/Toast.vue'
import mixins from './mixins'
import { useToastStore } from '~/stores/toast'
import * as Config from '~/config'

/**
 * Vue Settings
 */

// Authorization header
axios.interceptors.request.use((config) => {
  config.headers = {
    Authorization: `Bearer ${  localStorage.getItem('access_token')}`,
    Accept: 'application/json',
  }
  return config
}, error => Promise.reject(error))

// Show toast with message for non OK responses
axios.interceptors.response.use(response => response, (error) => {
  // Ignore /me url
  if (! error.response.config.url.includes('/me')) {
    useToastStore().addToastMessage({
      text: error.response.data.message || `Request error status: ${  error.response.status}`,
      type: 'danger',
    })
  }
  return Promise.reject(error)
})

axios.defaults.baseURL = Config.apiPath

/**
 * Application
 */
const app = createApp(App)
app.use(router)
app.use(createPinia())

// Global Vue Components
app.component('Navbar', Navbar)
app.component('Spinner', Spinner)
app.component('Toast', Toast)

app.mixin(mixins)

app.mount('#app') // Vue Instance - Root component

if (window.Cypress) {
  window.store = store
}
