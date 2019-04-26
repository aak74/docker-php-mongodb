import api from '../api';
// import Token from '../service/Token';

const loadStatus = ({ commit }) => {
  api.get('status/', null, (response) => {
    commit('STATUS_LOADED', response.data);
  });
};

const loadProjects = ({ commit }) => {
  console.log('loadProjects');

  api.get('projects', {}, data => {
    commit('LOADED_PROJECTS', data);
  });
};

const getProject = ({ commit }, id) => {
  api.getData('get', `projects/${id}`)
    .then(data => {
      commit('LOADED_PROJECT', data, data);
      // console.log(data);
    });
};

const addProject = ({ commit }, data) => {
  api.request('post', 'projects/', data)
    .then(
      commit('ADDED_PROJECT', data),
    );
};

const deleteProject = ({ commit }, data) => {
  api.request('delete', `projects/${data.id}`, data)
    .then(
      commit('DELETED_PROJECT', data),
    );
};

const saveProject = ({ commit }, data) => {
  api.request('post', `projects/${data.id}`, data)
    .then(
      commit('SAVED_PROJECT', data),
    );
};

const backupProject = ({ commit }, id) => {
  api.request('get', `projects/${id}/backup`, id)
    .then(
      commit('BACKUP_TASK_SENDED', id),
    );
};

const signIn = ({ commit }, login) => {
  api.getLogin('post', 'user/login', login)
    .then(data => {
      commit('SIGN_IN', data);
    })
    .catch(error => {
      commit('SIGN_IN_FAIL', error);
    });
};

const login = ({ commit }, login) => {
  api.login(login)
    .then(data => {
      commit('SIGN_IN', data);
    })
    .catch(error => {
      commit('SIGN_IN_FAIL', error);
    });
};

const auth = ({ commit }) => {
  api.getLogin('get', 'secret')
    .then(data => {
      commit('AUTH', data);
    });
};

const refreshOperation = ({ commit }, refreshDATA) => {
  api.request(refreshDATA.METHOD, refreshDATA.URI, refreshDATA.DATA)
    .then(res => {
      commit('isAdmin', res);
      commit('USERS', res);
      commit('DELETED_USER', res);
      commit('BLOCK_USER', res);
      commit('UNBLOCK_USER', res);
      commit('getProject', res);
      commit('loadProjects', res);
      commit('LOADED_PROJECTS', res.data.data);
    });
};

const register = ({ commit }, data) => {
  api.request('post', 'user/register', data)
    .then(requestData => {
      commit('REGISTER', requestData);
    })
    .catch(error => {
      commit('REGISTER_FAIL', error);
    });
};

const isAdmin = ({ commit }) => {
  api.request('get', 'isAdmin/')
    .then(requestData => {
      commit('isAdmin', requestData);
    });
};

const users = ({ commit }) => {
  api.request('get', 'users')
    .then(data => {
      commit('USERS', data);
    });
};

const userDelete = ({ commit }, id) => {
  api.request('delete', `user/${id}`)
    .then(data => {
      commit('DELETED_USER', data);
    });
};
const block = ({ commit }, id) => {
  api.request('delete', `block/user/${id}`)
    .then(data => {
      commit('BLOCK_USER', data);
    });
};
const unblock = ({ commit }, id) => {
  api.request('delete', `unblock/user/${id}`)
    .then(data => {
      commit('UNBLOCK_USER', data);
    });
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
  users,
  userDelete,
  // refreshToken,
  refreshOperation,
  block,
  unblock,
  isAdmin,
  login
};
