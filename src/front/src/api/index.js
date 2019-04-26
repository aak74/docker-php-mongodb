/* eslint-disable consistent-return, no-console */

import axios from 'axios';
// import store from '../store';
import server from '../config/server';
// import Token from '../service/Token';
// import { log } from 'util';

class Api {
  constructor(options = {}) {
    this.client = options.client || axios.create();
    this.token = options.token;
    this.refreshToken = options.refreshToken;
    this.refreshRequest = false;
    this.urls = {
      authBase: 'auth/user',
      auth: 'auth/user',
      refreshToken: 'auth/refreshToken',
    }
    this.requests = [];
/*
    this.client.interceptors.response.use(
      r => r,
      async error => {
        console.log('interceptors error', error);
        // if (error.request.responseURL === 'http://localhost:8080/api/v1/projects/') {
        //   debugger;
        // }
        if (
          !this.refreshToken ||
          error.response.status !== 401 ||
          error.config.retry
        ) {
          throw error;
        }

        if (!this.refreshRequest) {
          this.refreshRequest = true;
          this.getRefreshToken();
        }

        const { data } = await this.refreshRequest;
        this.token = data.token;
        this.refreshToken = data.refreshToken;
        const newRequest = {
          ...error.config,
          retry: true,
        };

        return this.client(newRequest);
      }
    );
*/
  }

  addRequestToQueue(request) {
    this.requests.push(request);
  }

  async getRefreshToken() {
    if (this.refreshRequest) {
      return;
    }
    this.refreshRequest = true;

    console.log('getRefreshToken', this.urls.refreshToken);
    if (!this.refreshToken) {
      await this.login({ login: 'ak', password: 'Woodae23!' });
      this.executeRequests();
      // throw new Error('Refresh Token doesn`t exists');
    }

    this.post(this.urls.refreshToken, { data: { token: this.refreshToken } }, (response) => {
      console.log('getRefreshToken response', response);

      this.token = response.data.token;
      this.refreshToken = response.data.refreshToken;
      this.executeRequests();
      this.refreshRequest = false;
    });
  }

  executeRequests() {
    let request = null;
    while (request = this.requests.shift()) {
      this.request(request.method, request.uri, request.config, request.cb);
    }
  }

  async login(credentials) {
    console.log('api login', credentials);
    return new Promise(async (resolve, reject) => {
      const data = await this.post('auth/user', { data: credentials });
      // debugger;
      this.token = data.token;
      this.refreshToken = data.refreshToken;
      resolve();
    });
  }

  logout() {
    this.token = null;
    this.refreshToken = null;
  }

  post(uri, config, cb) {
    return this.request('post', uri, config, cb);
  }

  get(uri, config, cb) {
    return this.request('get', uri, config, cb);
  }

  async request(method, uri, config, cb) {
    if (!method) {
      throw new Error('API function call requires method argument');
    }

    if (!uri) {
      throw new Error('API function call requires uri argument');
    }

    const isAuthNeed = (uri.indexOf(this.urls.authBase) === -1);
    if (isAuthNeed) {
      if (!this.token) {
        this.getRefreshToken();
        this.addRequestToQueue({ method, uri, config, cb });
        return false;
      }
    }

    const url = (uri.substr(0, 4) === 'http')
      ? uri
      : server.serverURI + uri;

    console.log('request', arguments);

    const params = {
      method,
      url,
      data: config.data || null,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      timeout: config.timeout || server.timeout,
    };

    if (uri !== this.urls.auth) {
      params.headers.Authorization = (uri === this.urls.refreshToken)
        ? `Bearer ${this.refreshToken}`
        : `Bearer ${this.token}`;
    }

    console.log({ params });

    const result = this.client.request(params)
      .then(response => {
        if (response) {
          if (response.data.status !== 'ok') {
            store.commit('admin/LOADING_ERROR', { message: 'Response status is not ok', code: 406 });
            return;
          }

          store.commit('admin/LOADED');
          return response.data.data;
        }
      })
      .catch(error => {
        console.log('request error', error);
        if (error.status !== 401) {
          this.addRequestToQueue({ method, uri, config, cb });
          this.getRefreshToken();
        }



        store.commit('admin/LOADING_ERROR', error);
      });
    return result;
  }
}

export default new Api({
  token: localStorage.getItem('token'),
  refreshToken: localStorage.getItem('refreshToken'),
});

