import container from '../services/Container';

const loader = container.resolve('loader');

const loadStatus = ({ commit }) => {
  loader.get('status/', null, response => {
    commit('STATUS_LOADED', response.data);
  });
};

const loadProjects = ({ commit }) => {
  console.log('loadProjects');
  loader.get('projects').then(data => {
    commit('LOADED_PROJECTS', data);
  });
};

const getProject = ({ commit }, id) => {
  loader.get('get', `projects/${id}`)
    .then(data => {
      commit('LOADED_PROJECT', data, data);
      // console.log(data);
    });
};

const addProject = ({ commit }, data) => {
  loader.request('post', 'projects/', data)
    .then(
      commit('ADDED_PROJECT', data),
    );
};

const deleteProject = ({ commit }, data) => {
  loader.request('delete', `projects/${data.id}`, data)
    .then(
      commit('DELETED_PROJECT', data),
    );
};

const saveProject = ({ commit }, data) => {
  loader.request('post', `projects/${data.id}`, data)
    .then(
      commit('SAVED_PROJECT', data),
    );
};

const backupProject = ({ commit }, id) => {
  loader.request('get', `projects/${id}/backup`, id)
    .then(
      commit('BACKUP_TASK_SENDED', id),
    );
};

const login = ({ commit }, credentials) => {
  loader.login(credentials)
    .then(() => {
      commit('LOGIN_SUCCESS', credentials.login);
    })
    .catch(error => {
      commit('LOGIN_FAIL', error);
    });
};

const auth = ({ commit }) => {
  loader.getLogin('get', 'secret')
    .then(data => {
      commit('AUTH', data);
    });
};

const refreshOperation = ({ commit }, refreshDATA) => {
  loader.request(refreshDATA.METHOD, refreshDATA.URI, refreshDATA.DATA)
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
  loader.request('post', 'user/register', { data })
    .then(() => {
      commit('REGISTER');
    })
    .catch(error => {
      console.log('Register error', error);
      commit('REGISTER_FAIL');
    });
};

const isAdmin = ({ commit }) => {
  loader.request('get', 'isAdmin/')
    .then(requestData => {
      commit('isAdmin', requestData);
    });
};

const users = ({ commit }) => {
  loader.request('get', 'users')
    .then(data => {
      commit('USERS', data);
    });
};

const userDelete = ({ commit }, id) => {
  loader.request('delete', `user/${id}`)
    .then(data => {
      commit('DELETED_USER', data);
    });
};
const block = ({ commit }, id) => {
  loader.request('delete', `block/user/${id}`)
    .then(data => {
      commit('BLOCK_USER', data);
    });
};
const unblock = ({ commit }, id) => {
  loader.request('delete', `unblock/user/${id}`)
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
  register,
  auth,
  users,
  userDelete,
  // refreshToken,
  refreshOperation,
  block,
  unblock,
  isAdmin,
  login,
};
