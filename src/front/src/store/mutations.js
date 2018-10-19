export default {
  STATUS_LOADED(state, payload) {
    // console.log('STATUS_LOADED', payload);

    state.appStatus = payload;
  },

  TOTAL_HISTORY_LOADED(state, payload) {
    state.history.total = payload.data;
  },
  CONTAINER_HISTORY_LOADED(state, payload) {
    state.history.containers[payload[0].info.name] = payload;
  },
  HISTORY_STATS_LOADED(state, payload) {
    state.historyStats = payload.data;
  },

  CLEAR_NOTIFICATIONS: state => {
    state.socket.notifications = [];
  },
  CLEAR_TEST_RESPONSE: state => {
    state.socket.testResponse = null;
  },

  SET_ERROR(state, error) {
    console.log('SET_ERROR', error);
    state.error = error;
  },

  LOADED_PROJECTS(state, data) {
    console.log('LOADED_PROJECTS', data);
    state.projects = data;
  },

  OPENED_PROJECT(state, data) {
    console.log('OPENED_PROJECT', data);
    state.currentProject = data;
  },

  ADDED_PROJECT(state, data) {
    console.log('ADDED PROJECT - ', data);
  },

  DELETED_PROJECT(state, data) {
    console.log('DELETED PROJECT - ', data);
  },

  SAVED_PROJECT(state, data) {
    console.log('SAVED PROJECT - ', data);
  },

  BACKUP_TASK_SENDED(state, data) {
    console.log('BACKUP TASK SENDED TO QUEUE - ', data);
  },
};
