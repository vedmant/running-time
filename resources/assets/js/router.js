import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {path: '/', component: require('./components/pages/Front.vue')},
  {path: '/login', component: require('./components/pages/Login.vue')},
  {path: '/logout', component: require('./components/pages/Logout.vue')},
  {path: '/register', component: require('./components/pages/Register.vue')},
  {path: '/dashboard', component: require('./components/pages/Dashboard.vue'), meta: { requiresAuth: true }},
  {path: '/entries', component: require('./components/pages/entry/List.vue'), meta: { requiresAuth: true }},
  {path: '/entry/new', component: require('./components/pages/entry/New.vue'), meta: { requiresAuth: true }},
  {path: '/entry/edit/:id', component: require('./components/pages/entry/Edit.vue'), meta: { requiresAuth: true }},
];

const router = new VueRouter({
  routes,
  history: false,
});

export default router;
