/* eslint-disable no-underscore-dangle */
import container from '../services/Container';

const client = container.resolve('client');
const projectModel = container.resolve('projectModel');

const getProjects = async ({ commit }) => {
  console.log('getProjects');
  const data = await projectModel.getList();
  commit('LOADED_PROJECTS', data);
};

const getProject = async ({ commit }, id) => {
  const promise = new Promise(resolve => {
    projectModel.getOne(id)
      .then(data => {
        commit('LOADED_PROJECT', data);
        resolve();
      });
  });
  return promise;
};

const deleteProject = async ({ commit }, id) => {
  console.log('deleteProject', id);
  await projectModel.delete(id);
  commit('DELETED_PROJECT', id);
  getProjects({ commit });
};

const saveProject = async ({ commit, state }, data) => {
  console.log('saveProject', data, state.current._id);

  if (data._id) {
    // data._id = state.current._id;
    await projectModel.save(data);
    commit('SAVED_PROJECT', data);
    commit('CLEAR_CURRENT');
  } else {
    await projectModel.add(data);
    commit('ADDED_PROJECT', data);
    commit('CLEAR_CURRENT');
  }
  getProjects({ commit });
};

const backupProject = ({ commit }, id) => {
  projectModel.backup(id)
    .then(
      commit('BACKUP_TASK_SENDED', id),
    );
};

const register = ({ commit }, data) => {
  client.request('post', 'user/register', { data })
    .then(() => {
      commit('REGISTER');
    })
    .catch(error => {
      console.log('Register error', error);
      commit('REGISTER_FAIL');
    });
};

const isAdmin = ({ commit }) => {
  client.request('get', 'isAdmin/')
    .then(requestData => {
      commit('isAdmin', requestData);
    });
};

const users = ({ commit }) => {
  client.request('get', 'users')
    .then(data => {
      commit('USERS', data);
    });
};

const userDelete = ({ commit }, id) => {
  client.request('delete', `user/${id}`)
    .then(data => {
      commit('DELETED_USER', data);
    });
};
const block = ({ commit }, id) => {
  client.request('delete', `block/user/${id}`)
    .then(data => {
      commit('BLOCK_USER', data);
    });
};
const unblock = ({ commit }, id) => {
  client.request('delete', `unblock/user/${id}`)
    .then(data => {
      commit('UNBLOCK_USER', data);
    });
};

export default {
  getProjects,
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
