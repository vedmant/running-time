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

  {path: '/admin', component: require('./components/pages/admin/Admin.vue'), meta: { requiresAdmin: true }, children: [
    {path: '', redirect: 'dashboard'},
    {path: 'dashboard', component: require('./components/pages/admin/dashboard/Dashboard.vue')},
    {path: 'users', component: require('./components/pages/admin/user/List.vue')},
    {path: 'entries', component: require('./components/pages/admin/entry/List.vue')},
  ]},

  {path: '*', component: require('./components/pages/404.vue')},
];


const router = new VueRouter({
  routes,
  history: false,
});

export default router;
