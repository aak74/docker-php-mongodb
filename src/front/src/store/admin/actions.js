import api from '../../api';
import entity from './entity';

import mockEntities from '../../mock/admin/entities';
import mockExtraMenuItem from '../../mock/admin/extraMenuItem';
import mockLeftMenu from '../../mock/admin/leftMenu';

const loadEntitiesFromMock = ({ commit }) => {
  commit('LOADED_ALL', {
    entities: mockEntities,
    extraMenuItem: mockExtraMenuItem,
    leftMenu: mockLeftMenu,
  });
};

const loadEntitiesFromBackend = ({ commit }) => {
  api.getData('get', 'admin/all/')
    .then(data => {
      commit('LOADED_ALL', data);
    });
};

const loadLeftMenu = ({ commit }) => {
  commit('LOADED_LEFT_MENU', mockLeftMenu);
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
  api.getData('get', entity.getApiPathByEntityName(store.state, entityName))
    .then(data => {
      // console.log('resolve', data);
      store.commit('LOADED_ENTITY', { data, entityName });
    });
};

export default {
  loadAll,
  loadEntity,
  loadLeftMenu,
};
