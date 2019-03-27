import 'babel-polyfill'
import Vue from 'vue'
import axios from 'axios'
import jQuery from 'jquery'
import moment from 'moment-mini'
import store from './vuex/store' // vuex store instance
import router from './router' // vue-router instance
import './mixins'
import VueCharts from 'vue-charts'

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
Vue.component('navbar', require('./components/layout/Navbar.vue'))
Vue.component('spinner', require('./components/layout/Spinner.vue'))
Vue.component('toast', require('./components/layout/Toast.vue'))

/**
 * Application
 *
 * @type {Vue$2}
 */
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
})
