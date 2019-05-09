import container from '../services/Container';

const loader = container.resolve('loader');
const projectModel = container.resolve('projectModel');

const getProjects = ({ commit }) => {
  // console.log('getProjects');
  projectModel.getList().then(data => {
    commit('LOADED_PROJECTS', data);
  });
};

const getProject = ({ commit }, id) => {
  projectModel.getOne(id)
    .then(data => {
      commit('LOADED_PROJECT', data, data);
    });
};

const addProject = ({ commit }, data) => {
  projectModel.add(data)
    .then(
      commit('ADDED_PROJECT', data),
    );
};

const deleteProject = ({ commit }, id) => {
  projectModel.delete(id)
    .then(
      commit('DELETED_PROJECT', id),
    );
};

const saveProject = ({ commit }, data) => {
  projectModel.save(data)
    .then(
      commit('SAVED_PROJECT', data),
    );
};

const backupProject = ({ commit }, id) => {
  projectModel.backup(id)
    .then(
      commit('BACKUP_TASK_SENDED', id),
    );
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
  getProjects,
  addProject,
  deleteProject,
  saveProject,
  backupProject,
  getProject,
  register,
  users,
  userDelete,
  block,
  unblock,
  isAdmin,
};
