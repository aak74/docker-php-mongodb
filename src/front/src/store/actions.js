import container from '../services/Container';

const loader = container.resolve('loader');
const projectModel = container.resolve('projectModel');

const getProjects = async ({ commit }) => {
  console.log('getProjects');
  const data = await projectModel.getList();
  commit('LOADED_PROJECTS', data);
};

const getProject = async ({ commit }, id) => {
  const p = projectModel.getOne(id)
    .then(data => {
      commit('LOADED_PROJECT', data, data);
    });
  console.log('getProject', p, id);
  return p;
};

const deleteProject = async ({ commit }, id) => {
  console.log('deleteProject', id);
  await projectModel.delete(id);
  commit('DELETED_PROJECT', id);
  getProjects({ commit });
};

const saveProject = async ({ commit, state }, data) => {
  const fullData = Object.assign(state.project.current, data);
  // eslint-disable-next-line no-underscore-dangle
  if (state.project.current._id) {
    await projectModel.save(fullData);
    commit('SAVED_PROJECT', fullData);
  } else {
    await projectModel.add(fullData);
    commit('ADDED_PROJECT', fullData);
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
