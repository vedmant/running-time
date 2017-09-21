import "babel-polyfill";
import Vue from 'vue';
import jQuery from 'jquery';
import moment from 'moment-mini';
import store from './vuex/store' // vuex store instance
import router from './router' // vue-router instance
import './mixins';
import VueCharts from 'vue-charts';


/**
 * Assing global variables
 */

window.$ = window.jQuery = jQuery;
window.Vue = Vue;
window._ = _;
window.moment = moment;


/**
 * Require jQuery and Vue dependant libaries
 */

require('bootstrap-sass');
require('vue-resource');


/**
 * Vue Settings
 */

// Vue plugins
Vue.use(VueCharts);

// Authorization header
Vue.http.interceptors.push((request, next) => {
  request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
  // continue to next interceptor
  next((response) => {
    // Show toast with message for non OK responses
    if (response.status !== 200) {
      store.dispatch('addToastMessage', {
        text: response.body.message || 'Request error status: ' + response.status,
        type: 'danger'
      })
    }
  });
});

// Global Vue Components
Vue.component('navbar', require('./components/layout/Navbar.vue'));
Vue.component('spinner', require('./components/layout/Spinner.vue'));
Vue.component('toast', require('./components/layout/Toast.vue'));


/**
 * Application
 *
 * @type {Vue$2}
 */
const app = new Vue({
  el: '#app',
  router,
  store,
});

// Check user login status
store.dispatch('checkLogin').then(() => {
  router.replace('/dashboard')
}).catch(() => {});
