import Vue from 'vue'
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import jQuery from 'jquery';

/**
 * Assing global variables
 */

window.$ = window.jQuery = jQuery;
window.Vue = Vue;


/**
 * Require jQuery and Vue dependant libaries
 */

require('bootstrap-sass');
require('vue-resource');


/**
 * Vue extensions
 */

Vue.use(Vuex);
Vue.use(VueRouter);


/**
 * Attach the "CSRF" header to each of the outgoing requests issued by this application.
 * The CSRF middleware included with Laravel will automatically verify the header's value.
 */
Vue.http.interceptors.push((request, next) => {
   request.headers.set('X-CSRF-TOKEN', Laravel.csrfToken);

   next();
});


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('example', require('./components/Example.vue'));

Vue.component('passport-clients', require('./components/passport/Clients.vue'));
Vue.component('passport-authorized-clients', require('./components/passport/AuthorizedClients.vue'));
Vue.component('passport-personal-access-tokens', require('./components/passport/PersonalAccessTokens.vue'));

const app = new Vue({
    el: '#app'
});
