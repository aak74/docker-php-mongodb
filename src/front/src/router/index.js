import Vue from 'vue';
import Router from 'vue-router';

import Dashboard from '../pages/Dashboard.vue';
import Projects from '../pages/Projects.vue';
import Project from '../pages/Project.vue';
import ServerStatus from '../pages/ServerStatus.vue';
import Login from '../pages/Login.vue';
import Logout from '../pages/Logout.vue';
import Users from '../pages/Users.vue';
import Blocked from '../pages/Blocked.vue';

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
    path: '/logout',
    name: 'Logout',
    component: Logout,
  },
  {
    path: '/Users',
    name: 'Users',
    component: Users,
  },
  {
    path: '/Blocked',
    name: 'Blocked',
    component: Blocked,
  },
];

export default new Router({
  mode: 'history',
  routes,
});
