/* eslint-disable no-new, no-consistent-return, no-console */

import Vue from 'vue';
// import Vuetify from 'vuetify';
// import 'vuetify/dist/vuetify.min.css';
import Notifications from 'vue-notification';
import Msg from 'vue-message';

import './plugins/vuetify';
import './plugins/ctrl';
import App from './App.vue';
import store from './store';
import router from './router';


// Vue.use(Vuetify);
Vue.use(Notifications);
Vue.use(Msg);

Vue.config.devtools = true;
Vue.config.productionTip = false;

new Vue({
  debug: true,
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});

// store.dispatch('login', { login: 'ak', password: 'Woodae23!' });
store.dispatch('admin/loadAll');
// store.dispatch('isAdmin');

// store.dispatch('socket/connect');
