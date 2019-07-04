import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import axios from 'axios'
import jQuery from 'jquery'
import moment from 'moment-mini'
import store from './vuex/store' // vuex store instance
import router from './router' // vue-router instance
import './mixins'
import VueCharts from 'vue-charts'
import App from './components/App'
import Navbar from './components/layout/Navbar'
import Spinner from './components/layout/Spinner'
import Toast from './components/layout/Toast'


/**
 * Assing global variables
 */

window.$ = window.jQuery = jQuery
window.Vue = Vue
window.moment = moment

/**
 * Require jQuery and Vue dependant libaries
 */

require('bootstrap-sass')

/**
 * Vue Settings
 */

// Vue plugins
Vue.use(VueCharts)

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

// Global Vue Components
Vue.component('navbar', Navbar)
Vue.component('spinner', Spinner)
Vue.component('toast', Toast)

/**
 * Application
 *
 * @type {Vue$2}
 */
/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  store,
  render (createElement) {
    return createElement(App)
  },
})

if (window.Cypress) {
  window.store = store
}
