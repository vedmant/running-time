import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { createApp } from 'vue'
import axios from 'axios'
import jQuery from 'jquery'
import moment from 'moment-mini'
import store from './vuex/store' // vuex store instance
import router from './router' // vue-router instance
import './mixins'
import App from './components/App'
import Navbar from './components/layout/Navbar'
import Spinner from './components/layout/Spinner'
import Toast from './components/layout/Toast'
import mixins from './mixins'

/**
 * Assing global variables
 */

window.$ = window.jQuery = jQuery
window.moment = moment

/**
 * Require jQuery and Vue dependant libaries
 */

require('bootstrap-sass')

/**
 * Vue Settings
 */

// Authorization header
axios.interceptors.request.use(function (config) {
  config['headers'] = {
    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    Accept: 'application/json',
  }
  return config
}, error => Promise.reject(error))

// Show toast with message for non OK responses
axios.interceptors.response.use(response => response, error => {
  // Ignore /me url
  if (! error.response.config.url.includes('/me')) {
    store.dispatch('addToastMessage', {
      text: error.response.data.message || 'Request error status: ' + error.response.status,
      type: 'danger'
    })
  }
  return Promise.reject(error)
})

/**
 * Application
 */
const app = createApp(App)
app.use(router)
app.use(store)

// Global Vue Components
app.component('navbar', Navbar)
app.component('spinner', Spinner)
app.component('toast', Toast)

app.mixin(mixins)

app.mount('#app') // Vue Instance - Root component

if (window.Cypress) {
  window.store = store
}
