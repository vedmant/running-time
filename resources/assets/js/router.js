import { createWebHashHistory, createRouter } from 'vue-router'
import store from './vuex/store'
import { sync } from 'vuex-router-sync'

import Front from './components/pages/front/Front'

import Login from './components/pages/auth/Login'
import Logout from './components/pages/auth/Logout'
import Register from './components/pages/auth/Register'

import Dashboard from './components/pages/dashboard/Dashboard'

import EntryList from './components/pages/entry/List'
import EntryNew from './components/pages/entry/New'
import EntryEdit from './components/pages/entry/Edit'

import ReportWeekly from './components/pages/report/Weekly'

import Admin from './components/pages/admin/Admin'
import AdminDashboard from './components/pages/admin/dashboard/Dashboard'
import UserList from './components/pages/admin/user/List'
import UserShow from './components/pages/admin/user/Show'
import UserEdit from './components/pages/admin/user/Edit'

import AdminEntryList from './components/pages/admin/entry/List'
import AdminEntryEdit from './components/pages/admin/entry/Edit'
import Error404 from './components/pages/404'
import Profile from './components/pages/auth/Profile'
import Policy from './components/pages/Policy'
import DeleteAccount from './components/pages/DeleteAccount'

const routes = [
  { path: '/', component: Front },

  { path: '/policy', component: Policy },
  { path: '/delete-account', component: DeleteAccount },
  { path: '/login', component: Login, meta: { guestOnly: true } },
  { path: '/logout', component: Logout, meta: { requiresAuth: true } },
  { path: '/register', component: Register, meta: { guestOnly: true } },
  { path: '/profile', component: Profile, meta: { requiresAuth: true } },

  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },

  { path: '/entries', component: EntryList, meta: { requiresAuth: true } },
  { path: '/entry/new', component: EntryNew, meta: { requiresAuth: true } },
  { path: '/entry/edit/:id', component: EntryEdit, meta: { requiresAuth: true } },

  { path: '/report/weekly', component: ReportWeekly, meta: { requiresAuth: true } },

  {
    path: '/admin',
    component: Admin,
    meta: { requiresAdmin: true },
    children: [
      { path: '', redirect: '/admin/dashboard' },
      { path: 'dashboard', component: AdminDashboard },

      { path: 'users', component: UserList },
      { path: 'user/show/:id', component: UserShow },
      { path: 'user/edit/:id', component: UserEdit },

      { path: 'entries', component: AdminEntryList },
      { path: 'entry/edit/:id', component: AdminEntryEdit },
    ],
  },

  {
    path: '/:catchAll(.*)', // Unrecognized path automatically matches 404
    component: Error404,
  },
]


const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// Sync Vuex and vue-router;
sync(store, router)

/**
 * Authenticated routes
 */
router.beforeEach(async (to, from, next) => {
  if (! store.state.auth.me && ! store.state.auth.authChecked) {
    await store.dispatch('checkLogin')
      .catch(() => {
      })
  }
  const me = store.state.auth.me

  if (to.matched.some(record => record.meta.guestOnly) && me) {
    // Guest only page, dont follow there when user is authenticated
    next(false)
  } else if (to.matched.some(record => record.meta.requiresAuth) && ! me) {
    // if route requires auth and user isn't authenticated
    next('/login')
  } else if (to.matched.some(record => record.meta.requiresAdmin) &&
    (! me || ! ['admin', 'manager'].includes(store.state.auth.me.role))) {
    // if route required admin or manager role
    next('/login')
  } else {
    next()
  }
})


export default router
