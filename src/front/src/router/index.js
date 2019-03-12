import Vue from 'vue';
import Router from 'vue-router';

import Dashboard from '../pages/Dashboard';
import Projects from '../pages/Projects';
import Project from '../pages/Project';
import ServerStatus from '../pages/ServerStatus';
import Login from '../pages/LoginPage';
import Welcome from '../pages/Welcome';
import Users from '../pages/Users';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects,
  },
  {
    path: '/projects/:id',
    name: 'Project',
    component: Project,
  },
  {
    path: '/server-status',
    name: 'Server status',
    component: ServerStatus,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/Welcome',
    name: 'Welcome',
    component: Welcome,
  },
  {
    path: '/Users',
    name: 'Users',
    component: Users,
  },
];

export default new Router({
  mode: 'history',
  routes,
});
