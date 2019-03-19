/* eslint-disable no-cond-assign */
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import store from '.';
import router from '../router';

dayjs.extend(relativeTime);

export default {
  STATUS_LOADED(state, payload) {
    console.log('STATUS_LOADED', payload);

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
    state.error = error;
  },

  LOADED_PROJECTS(state, data) {
    if (data) {
      state.projects = data.map(elem => {
        if (elem.status && elem.status.lastUpdate) {
          elem.status.lastUpdate = dayjs(elem.status.lastUpdate).fromNow();
        } else {
          elem.status = {
            contentLength: 0,
            lastUpdate: 'Unknown',
            status: 'Unknown',
            statusText: 'Unknown',
            time: 0,
          };
        }
        return elem;
      }).sort((a, b) => ((a.name > b.name) ? 1 : -1));
    }
  },

  LOADED_PROJECT(state, data) {
    console.log('LOADED_PROJECT', data);
    if (data) {
      state.project.current = data;
    }
  },

  ADDED_PROJECT(_, data) {
    console.log('ADDED PROJECT - ', data);
  },

  DELETED_PROJECT(_, data) {
    console.log('DELETED PROJECT - ', data);
  },

  SAVED_PROJECT(_, data) {
    console.log('SAVED PROJECT - ', data);
  },

  BACKUP_TASK_SENDED(_, data) {
    console.log('BACKUP TASK SENDED TO QUEUE - ', data);
  },

  SERVERS_STATUS_LOADED(_, data) {
    console.log('SERVERS STATUSE LOADED - ', data);
  },
  SIGN_IN(state, data) {
    state.login = data;
    const JWTtoken = `${state.login.data.token}`;
    const refreshtTtoken = state.login.data.refreshToken;
    const name = `${state.login.data.name}`;
    localStorage.setItem('token', JWTtoken);
    localStorage.setItem('refreshToken', refreshtTtoken);
    localStorage.setItem('UserName', name);
    localStorage.setItem('FirstLogin', false);
    localStorage.setItem('isLogin', true);
  },

  SIGN_IN_REFRESH(state, data) {
    state.login = data;
    const JWTtoken = `${state.login.data.token}`;
    const refreshtTtoken = state.login.data.refreshToken;
    const name = `${state.login.data.name}`;
    localStorage.setItem('token', JWTtoken);
    localStorage.setItem('refreshToken', refreshtTtoken);
    localStorage.setItem('UserName', name);
  },

  OPERATION_REFRESH(state, data) {
    store.dispatch('refreshOperation', data);
  },
  SUCCES_REFRESH(state, refreshData) {
    if (((refreshData.data.data) && (!refreshData.data.data.name)) && (refreshData.data.data.type !== 'user')) {
      const refresh = refreshData.data.data;
      if (refresh) {
        state.projects = refresh.map(elem => {
          if (elem.status && elem.status.lastUpdate) {
            elem.status.lastUpdate = dayjs(elem.status.lastUpdate).fromNow();
          } else {
            elem.status = {
              contentLength: 0,
              lastUpdate: 'Unknown',
              status: 'Unknown',
              statusText: 'Unknown',
              time: 0,
            };
          }
          return elem;
        }).sort((a, b) => ((a.name > b.name) ? 1 : -1));
      }
    }
    if ((refreshData.data.data) && (refreshData.data.data.type !== 'user')) {
      if (refreshData.data.data.name) {
        state.project.current = refreshData.data.data;
      }
    }
    if (refreshData.data[0].type === 'user') {
      state.users = refreshData.data;
    }
  },


  SIGN_IN_FAIL() {
    console.log('LOGIN FAIL');
    localStorage.setItem('loginProcces', false);
  },
  AUTH(state, data) {
    console.log('AUTH', data);
  },

  REGISTER(state, data) {
    console.log('REGISTER', data.data.status);
    if (data.data.status === 'failed') {
      state.register = false;
    } else {
      state.register = true;
    }
  },
  REGISTER_FAIL(state, data) {
    state.register = false;
    console.log('REGISTER_FAIL', data);
  },

  USERS(state, data) {
    if (data) {
      state.users = data.data;
    }
  },

  BLOCKED(state, data) {
    router.replace('/Blocked');
  },

  DELETED_USER(state, data) {
  },
  BLOCK_USER(state, data) {
  },
  UNBLOCK_USER(state, data) {
  },
};
