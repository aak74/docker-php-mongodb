import api from '../api';

const loadStatus = ({ commit }) => {
  api.request('get', 'status/', null, 2500)
    .then(response => {
      commit('STATUS_LOADED', response.data);
    });
};

const loadProjects = ({ commit }) => {
  api.getData('get', 'projects/')
    .then(data => {
      commit('LOADED_PROJECTS', data);
    });
};

const addProject = ({ commit }, data) => {
  const req = ['add', data];
  api.request('post', 'projects/', req)
    .then(
      commit('ADDED_PROJECT', data));
};

const deleteProject = ({ commit }, id) => {
  const req = ['delete', id];
  api.request('post', 'projects/', req)
    .then(
      commit('DELETED_PROJECT', id));
};

const editProject = ({ commit }, data) => {
  const req = ['edit', data];
  api.request('post', 'projects/', req)
    .then(
      commit('EDITED_PROJECT', data));
};

export default {
  loadStatus,
  loadProjects,
  addProject,
  deleteProject,
  editProject,
};
