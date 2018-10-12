import Vue from 'vue';
import Router from 'vue-router';

import Dashboard from '../pages/Dashboard';
import Services from '../pages/Services';
import Settings from '../pages/Settings';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/services',
    name: 'Services',
    component: Services,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
  },
];

export default new Router({
  mode: 'history',
  routes,
});
