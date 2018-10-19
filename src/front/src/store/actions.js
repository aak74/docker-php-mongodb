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

const openProject = ({ commit }, id) => {
  api.getData('get', `projects/${id}`)
    .then(data => {
      commit('OPENED_PROJECT', data);
    });
};

const addProject = ({ commit }, data) => {
  api.request('post', 'projects/', data)
    .then(
      commit('ADDED_PROJECT', data));
};

const deleteProject = ({ commit }, id) => {
  api.request('delete', `projects/${id}`)
    .then(
      commit('DELETED_PROJECT', id));
};

const saveProject = ({ commit }, data) => {
  api.request('post', `projects/${data.id}`, data)
    .then(
      commit('SAVED_PROJECT', data));
};

const backupProject = ({ commit }, id) => {
  api.request('get', `projects/${id}/backup`)
    .then(
      commit('BACKUP_TASK_SENDED', id));
};

export default {
  loadStatus,
  loadProjects,
  addProject,
  deleteProject,
  saveProject,
  backupProject,
  openProject,
};
