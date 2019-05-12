/* eslint-disable no-underscore-dangle */
/* eslint-disable no-cond-assign */
import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';
// import store from '.';
import getFieldsWithSchema from '../services/GetFieldsWithSchema';
import router from '../router';

// dayjs.extend(relativeTime);

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
    state.error = error;
  },

  LOADED_PROJECTS(state, data) {
    // console.log('LOADED', data);
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
    // console.log('LOADED_PROJECT', data);
    if (data) {
      state.current.data = data;
      state.current.id = data._id;
    }
    state.current.fields = getFieldsWithSchema(state.project.schema, data);
    // console.log('LOADED_PROJECT 2', state.current.fields);
    // debugger;
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

  LOGIN_REFRESH(state, data) {
    state.login = data;
    const JWTtoken = `${state.login.data.token}`;
    const refreshtTtoken = state.login.data.refreshToken;
    const name = `${state.login.data.name}`;
    localStorage.setItem('token', JWTtoken);
    localStorage.setItem('refreshToken', refreshtTtoken);
    localStorage.setItem('UserName', name);
  },

  LOGIN_FAIL() {
    // console.log('LOGIN FAIL');
    localStorage.setItem('loginProcces', false);
  },

  AUTH(_, data) {
    console.log('AUTH', data);
  },

  REGISTER(state) {
    state.registered = true;
  },

  isAdmin(state, data) {
    if (data.data.isAdmin) {
      state.isAdmin = true;
    } else if (!state.isAdmin) {
      state.isAdmin = false;
    }
  },

  REGISTER_FAIL(state) {
    state.registered = false;
  },

  USERS(state, data) {
    if (data) {
      state.users = data.data;
    }
  },

  BLOCKED() {
    router.replace('/Blocked');
  },

  CLEAR_CURRENT(state) {
    state.current.data = [];
    state.current.fields = getFieldsWithSchema(state.project.schema, []);
  },
/*
  DELETED_USER(state, data) {
  },

  BLOCK_USER(state, data) {
  },

  UNBLOCK_USER(state, data) {
  },
*/
};
