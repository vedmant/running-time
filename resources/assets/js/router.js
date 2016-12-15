import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {path: '/', component: require('./components/pages/front/Front.vue')},

  {path: '/login', component: require('./components/pages/auth/Login.vue')},
  {path: '/logout', component: require('./components/pages/auth/Logout.vue')},
  {path: '/register', component: require('./components/pages/auth/Register.vue')},

  {path: '/dashboard', component: require('./components/pages/dashboard/Dashboard.vue'), meta: { requiresAuth: true }},

  {path: '/entries', component: require('./components/pages/entry/List.vue'), meta: { requiresAuth: true }},
  {path: '/entry/new', component: require('./components/pages/entry/New.vue'), meta: { requiresAuth: true }},
  {path: '/entry/edit/:id', component: require('./components/pages/entry/Edit.vue'), meta: { requiresAuth: true }},

  {path: '/admin/dashboard', component: require('./components/pages/admin/Dashboard.vue'), meta: { requiresAdmin: true }},

  {path: '*', component: require('./components/pages/404.vue')},
];


const router = new VueRouter({
  routes,
  history: false,
});

export default router;
