/* eslint-disable consistent-return, no-console */

import axios from 'axios';
import store from '../store';
import server from '../config/server';

const request = (method, uri, data, timeout = 5000) => {
  const JWTtoken = () => {
    if (uri === '/refreshToken') {
      return `jwt ${localStorage.getItem('refreshToken')}`;
    }
    return `jwt ${localStorage.getItem('token')}`;
  };
  if (!method) {
    console.error('API function call requires method argument');
    return;
  }

  if (!uri) {
    console.error('API function call requires uri argument');
    return;
  }

  console.log('uri>>>', uri, JWTtoken(), 'data>>>>>', data);
  const url = (uri.substr(0, 4) === 'http')
    ? uri
    : server.serverURI + uri;

  const result = axios({
    method,
    url,
    data,
    headers: {
      Authorization: JWTtoken(),
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    timeout,
  })
    .catch(error => {
      if (error.response.status === 401) {
        store.dispatch('refreshToken', method, uri, data);

      }
      store.commit('SET_ERROR', error);
    });
  return result;
};

const getLogin = (method, uri, data) => {
  const result = request(method, uri, data);
  return result;
};

const getLoginNew = (method, uri, data) => {
  // console.log('getData', store);
  store.commit('admin/LOADING');

  const result = request(method, uri)
    .then(response => {
      if (response.data.status !== 'ok') {
        store.commit('admin/LOADING_ERROR', { message: 'Response status is not ok', code: 406 });
        return;
      }
      store.commit('admin/LOADED');
      return response.data.data;
    })
    .catch(error => {
      store.commit('admin/LOADING_ERROR', error);
    });

  return result;
};

const getData = (method, uri) => {
  // console.log('getData', store);
  store.commit('admin/LOADING');
  const result = request(method, uri)
    .then(response => {
      if (response.data.status !== 'ok') {
        store.commit('admin/LOADING_ERROR', { message: 'Response status is not ok', code: 406 });
        return;
      }

      store.commit('admin/LOADED');
      return response.data.data;
    })
    .catch(error => {
      store.commit('admin/LOADING_ERROR', error);
    });
  return result;
};

export default {
  request,
  getLogin,
  getData,
  getLoginNew,
};
