import Vue from 'vue';
import Controller from '../Controller';

const ctrl = {};

ctrl.install = (vue, options) => {
  vue.prototype.$ctrl = options.ctrl;
};

Vue.use(ctrl, { ctrl: new Controller() });
