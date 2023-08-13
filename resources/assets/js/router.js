import { createWebHashHistory, createRouter } from 'vue-router'

import Front from './components/pages/front/Front.vue'

import Login from './components/pages/auth/Login.vue'
import Logout from './components/pages/auth/Logout.vue'
import Register from './components/pages/auth/Register.vue'

import Dashboard from './components/pages/dashboard/Dashboard.vue'

import EntryList from './components/pages/entry/List.vue'
import EntryNew from './components/pages/entry/New.vue'
import EntryEdit from './components/pages/entry/Edit.vue'

import ReportWeekly from './components/pages/report/Weekly.vue'

import Admin from './components/pages/admin/Admin.vue'
import AdminDashboard from './components/pages/admin/dashboard/Dashboard.vue'
import UserList from './components/pages/admin/user/List.vue'
import UserShow from './components/pages/admin/user/Show.vue'
import UserEdit from './components/pages/admin/user/Edit.vue'

import AdminEntryList from './components/pages/admin/entry/List.vue'
import AdminEntryEdit from './components/pages/admin/entry/Edit.vue'

import Error404 from './components/pages/404.vue'
import Profile from './components/pages/auth/Profile.vue'
import { useAuthStore } from './stores/auth'

const routes = [
  { path: '/', component: Front },

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

/**
 * Authenticated routes
 */
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  if (! authStore.me && ! authStore.authChecked) {
    try {
      await authStore.checkLogin()
    } catch (e) {}
  }
  const me = authStore.me

  if (to.matched.some(record => record.meta.guestOnly) && me) {
    // Guest only page, don't follow there when user is authenticated
    next(false)
  } else if (to.matched.some(record => record.meta.requiresAuth) && ! me) {
    // if route requires auth and user isn't authenticated
    next('/login')
  } else if (to.matched.some(record => record.meta.requiresAdmin) &&
    (! me || ! ['admin', 'manager'].includes(authStore.me.role))) {
    // if route required admin or manager role
    next('/login')
  } else {
    next()
  }
})


export default router
