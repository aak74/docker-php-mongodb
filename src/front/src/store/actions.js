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

const getProject = ({ commit }, id) => {
  api.getData('get', `projects/${id}`)
    .then(data => {
      commit('LOADED_PROJECT', data, data);
      //console.log(data);
    });
};

const signIn = ({ commit }, login) => {
  api.getLogin('post', 'user/login', login)
   .then(data => {
     commit('SIGN_IN', data);
    });
};

const auth = ({ commit }) => {
  api.getLogin('get', '/secret' )
   .then(data => {
     commit('AUTH', data);
    });
};

const register = ({ commit }, data) => {
  console.log({ commit },data);
  api.request('post', 'user/register', data)
   .then(
     commit('SIGN_IN', data)
  );
};

const addProject = ({ commit }, data) => {
  api.request('post', 'projects/', data)
    .then(
      commit('ADDED_PROJECT', data)
);
};

const deleteProject = ({ commit }, data) => {
  api.request('delete', `projects/${data.id}`, data)
    .then(
      commit('DELETED_PROJECT', data)
);
};

const saveProject = ({ commit }, data) => {
  api.request('post', `projects/${data.id}`, data)
    .then(
      commit('SAVED_PROJECT', data)
);
};

const backupProject = ({ commit }, data) => {

  api.request('get', `projects/${data.id}/backup`, data)
    .then(
      commit('BACKUP_TASK_SENDED', data)
);
};

export default {
  loadStatus,
  loadProjects,
  addProject,
  deleteProject,
  saveProject,
  backupProject,
  getProject,
  signIn,
  register,
  auth,
};
