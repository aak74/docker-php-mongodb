import entity from './entity';

import mockEntities from '../../mock/admin/entities';
import mockExtraMenuItem from '../../mock/admin/extraMenuItem';
import mockLeftMenu from '../../mock/admin/leftMenu';
import container from '../../services/Container';

const loader = container.resolve('loader');

const loadEntitiesFromMock = ({ commit }) => {
  commit('LOADED_ALL', {
    entities: mockEntities,
    extraMenuItem: mockExtraMenuItem,
    leftMenu: mockLeftMenu,
  });
};

const loadEntitiesFromBackend = ({ commit }) => {
  loader.get('admin/all/')
    .then(data => {
      commit('LOADED_ALL', data);
    });
};

/**
 * Load menus, entities
 * @param {store} store
 */
const loadAll = store => {
  // console.log('loadAll', store, store.state.loadFromBackend);
  if (!store.state.loadFromBackend) {
    loadEntitiesFromMock(store);
  } else {
    loadEntitiesFromBackend(store);
  }
};

/**
 * Load Entity from backend
 * @param {Object} store
 * @param {Object} payload
 */
const loadEntity = (store, { entityName }) => {
  // console.log('loadEntity', store.state, payload);
  loader.getData('get', entity.getApiPathByEntityName(store.state, entityName))
    .then(data => {
      // console.log('resolve', data);
      store.commit('LOADED_ENTITY', { data, entityName });
    });
};

const checkToken = ({ commit }) => {
  console.log('checkToken 0');
  loader.get('auth/checkToken')
    .then(user => {
      console.log('checkToken', user);
      if (!user) {
        commit('TOKEN_INVALID');
      } else {
        commit('TOKEN_VALID', user);
      }
    })
    .catch(err => {
      console.log('checkToken error', err);
      if (err.response && err.response.status === 401) {
        commit('TOKEN_INVALID');
      }
    });
};

const login = ({ commit, state }, credentials) => {
  console.log('login', credentials);
  loader.login(credentials, state.user.isRemember)
    .then(data => {
      console.log('actions login', { data });
      commit('LOGIN_SUCCESS', credentials.login);
    })
    .catch(err => {
      console.log({ err });
      commit('LOGIN_FAIL', err);
    });
};

const logout = ({ commit }) => {
  loader.logout();
  commit('LOGOUT');
};

export default {
  loadAll,
  loadEntity,
  checkToken,
  login,
  logout,
  setListeners({ commit }) {
    console.log('setListeners');
    loader.on('refreshToken', user => {
      console.log('loader.on refreshToken');
      commit('TOKEN_REFRESHED', user);
    });
  },
};
