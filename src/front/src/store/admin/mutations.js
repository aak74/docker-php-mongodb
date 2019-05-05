/* eslint-disable no-param-reassign, no-console */

import router from '../../router';
import getLeftMenu from '../../services/GetLeftMenu';
import mockLeftMenu from '../../mock/admin/leftMenu';

const SET_CURRENT_ENTITY = (state, entity) => {
  // console.log('SET_CURRENT_ENTITY', entity);
  state.currentEntity = entity;
  state.data.currentHeaders = state.data.headers[state.currentEntity];
};

const LOADING_SUCCESS = state => {
  state.status.loading = false;
};

const LOADED_ENTITIES = (state, entities) => {
  // console.log('LOADED_ENTITIES', entities);
  state.data.headers = {};
  state.data.entities = {};
  // console.log('loadAll 2', entities);
  entities.forEach(entity => {
    state.data.headers[entity.name] = [];
    entity.fields.forEach(field => {
      state.data.entities[entity.name] = entity;
      state.data.headers[entity.name].push({
        text: field.title,
        value: field.name,
      });
    });
  });
};

const LOADED_LEFT_MENU = (state, menuItems) => {
  console.log('LOADED_LEFT_MENU', menuItems, state);
  state.leftMenu = getLeftMenu(menuItems, state.isUnauthorized);
};


const LOGIN_SUCCESS = (state, login) => {
  state.isUnauthorized = false;
  state.login = login;
  LOADED_LEFT_MENU(state, mockLeftMenu);
  console.log({ router });
  if (router.currentRoute.name === 'Login') {
    router.push('/');
  }
};

export default {
  TOGGLE_MENU_MINI(state) {
    state.status.miniMenu = !state.status.miniMenu;
  },

  LOGOUT(state) {
    console.log('LOGOUT', state);
  },

  LOADING_ERROR(state, error) {
    console.error('LOADING_ERROR', error);
    state.status.loading = false;
  },

  LOADING(state) {
    state.status.loading = true;
  },

  LOADED(state) {
    // console.log('LOADED');
    LOADING_SUCCESS(state);
  },

  LOADED_ALL(state, data) {
    // console.log('LOADED_ALL', data);
    LOADED_ENTITIES(state, data.entities);
    LOADED_LEFT_MENU(state, data.leftMenu);
    LOADING_SUCCESS(state);
  },

  LOADED_ENTITY(state, payload) {
    // console.log('LOADED_USERS', payload);
    state.data.items = payload.data;
    SET_CURRENT_ENTITY(state, payload.entityName);
    LOADING_SUCCESS(state);
  },

  LOADED_WORKLOG(state, payload) {
    console.log('LOADED_WORKLOG', payload);

    state.data.worklog = payload.worklog;
    state.data.incomesByMonth = payload.incomesByMonth;
    state.data.totalIncome = payload.totalIncome;
    LOADING_SUCCESS(state);
  },

  // LOADED_ENTITIES,
  LOADING_SUCCESS,
  SET_CURRENT_ENTITY,
  LOADED_LEFT_MENU,
  TOKEN_VALID(state, user) {
    LOGIN_SUCCESS(state, user.login);
  },

  LOGIN_SUCCESS,
};
