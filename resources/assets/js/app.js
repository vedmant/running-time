import Vue from 'vue'
import jQuery from 'jquery';
import _ from 'lodash';
import store from './vuex/store' // vuex store instance
import router from './router' // vue-router instance
import { sync } from 'vuex-router-sync';

/**
 * Assing global variables
 */

window.$ = window.jQuery = jQuery;
window.Vue = Vue;
window._ = _;


/**
 * Require jQuery and Vue dependant libaries
 */

require('bootstrap-sass');
require('vue-resource');


/**
 * Attach the "CSRF" header to each of the outgoing requests issued by this application.
 * The CSRF middleware included with Laravel will automatically verify the header's value.
 */
// Vue.http.interceptors.push((request, next) => {
//   request.headers.set('X-CSRF-TOKEN', Laravel.csrfToken);
//   next();
// });


/**
 * Vue Components
 */
Vue.component('navbar', require('./components/layout/Navbar.vue'));
Vue.component('spinner', require('./components/layout/Spinner.vue'));
Vue.component('passport-clients', require('./components/passport/Clients.vue'));
Vue.component('passport-authorized-clients', require('./components/passport/AuthorizedClients.vue'));
Vue.component('passport-personal-access-tokens', require('./components/passport/PersonalAccessTokens.vue'));

/**
 * Authenticated routes
 */
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && ! store.state.user) {
    // if route requires auth and user isn't authenticated
    next('/login');
  } else {
    next();
  }
});

// Sync Vuex and vue-router;
sync(store, router);

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
store.dispatch('checkLogin');
