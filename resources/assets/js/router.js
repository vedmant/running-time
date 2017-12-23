import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './vuex/store'
import {sync} from 'vuex-router-sync'
import includes from 'lodash-es/includes'

Vue.use(VueRouter)

const routes = [
  {path: '/', component: require('./components/pages/front/Front.vue')},

  {path: '/login', component: require('./components/pages/auth/Login.vue')},
  {path: '/logout', component: require('./components/pages/auth/Logout.vue')},
  {path: '/register', component: require('./components/pages/auth/Register.vue')},
  {path: '/profile', component: require('./components/pages/auth/Profile.vue'), meta: {requiresAuth: true}},

  {path: '/dashboard', component: require('./components/pages/dashboard/Dashboard.vue'), meta: {requiresAuth: true}},

  {path: '/entries', component: require('./components/pages/entry/List.vue'), meta: {requiresAuth: true}},
  {path: '/entry/new', component: require('./components/pages/entry/New.vue'), meta: {requiresAuth: true}},
  {path: '/entry/edit/:id', component: require('./components/pages/entry/Edit.vue'), meta: {requiresAuth: true}},

  {path: '/report/weekly', component: require('./components/pages/report/Weekly.vue'), meta: {requiresAuth: true}},

  {
    path: '/admin',
    component: require('./components/pages/admin/Admin.vue'),
    meta: {requiresAdmin: true},
    children: [
      {path: '', redirect: 'dashboard'},
      {path: 'dashboard', component: require('./components/pages/admin/dashboard/Dashboard.vue')},

      {path: 'users', component: require('./components/pages/admin/user/List.vue')},
      {path: 'user/show/:id', component: require('./components/pages/admin/user/Show.vue')},
      {path: 'user/edit/:id', component: require('./components/pages/admin/user/Edit.vue')},

      {path: 'entries', component: require('./components/pages/admin/entry/List.vue')},
      {path: 'entry/edit/:id', component: require('./components/pages/admin/entry/Edit.vue')},
    ]
  },

  {path: '*', component: require('./components/pages/404.vue')},
]


const router = new VueRouter({
  routes,
  history: false,
})

// Sync Vuex and vue-router;
sync(store, router)

/**
 * Authenticated routes
 */
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && ! store.state.auth.me) {
    // if route requires auth and user isn't authenticated
    next('/login')
  } else if (to.matched.some(record => record.meta.requiresAdmin) && (! store.state.auth.me ||
      ! includes(['admin', 'manager'], store.state.auth.me.role))) {
    // if route required admin or manager role
    next('/login')
  } else {
    next()
  }
})


export default router
