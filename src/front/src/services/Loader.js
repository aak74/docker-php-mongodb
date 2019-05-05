/* eslint-disable class-methods-use-this */
import axios from 'axios';
import EventEmitter from 'eventemitter3';

class Loader extends EventEmitter {
  constructor({ token }, options = {}) {
    super();
    this.token = token;
    this.client = options.client || axios.create();
    this.urls = options.urls || {
      login: 'auth/login',
      refreshToken: 'auth/refreshToken',
    };
    this.server = options.server || {
      prefix: '/api/v1/',
      timeout: 30000,
    };

    this.credentials = options.credentials || {
      login: 'foo',
      password: 'foo',
    };

    this.requests = [];
  }

  async login(credentials) {
    // console.log('api login', credentials);
    return new Promise(async resolve => {
      const data = await this.post(this.urls.login, { data: credentials });
      // console.log('login data', data);

      // debugger;
      this.updateTokens(data);
      resolve();
    });
  }

  logout() {
    this.updateTokens({
      token: null,
      refreshToken: null,
    });
  }

  updateTokens({ token, refreshToken }) {
    this.token.token = token;
    this.token.refreshToken = refreshToken;
  }

  post(uri, config, cb) {
    return this.request('post', uri, config, cb);
  }

  get(uri, config, cb) {
    return this.request('get', uri, config, cb);
  }

  async request(method, uri, config, cb) {
    this.validateRequest(method, uri);
    /*
    const isAuthNeed = (uri.indexOf(this.urls.authBase) === -1);
    if (isAuthNeed) {
      if (!this.token) {
        this.getRefreshToken();
        this.addRequestToQueue({
          method, uri, config, cb,
        });
        return false;
      }
    }
    */

    const params = this.getParams(method, uri, config);

    let response = null;
    try {
      response = await this.client.request(params);
    } catch (error) {
      // console.log('request error', error, this.token);
      if (!error.response || (error.response.status !== 401)) {
        throw error;
      }
      // console.log('');

      if (!this.token.refreshToken) {
        throw error;
      }
      // debugger;
      this.addRequestToQueue({
        method, uri, config, cb,
      });
      await this.getRefreshToken();
      // store.commit('admin/LOADING_ERROR', error);
      return;
    }
    // console.log({ response });

    if (response) {
      if (response.data.status !== 'ok') {
        // store.commit('admin/LOADING_ERROR', { message: 'Response status is not ok', code: 406 });
        return;
      }

      return response.data.data;
    }
  }

  validateRequest(method, uri) {
    if (!method) {
      throw new Error('API function call requires method argument');
    }

    if (!uri) {
      throw new Error('API function call requires uri argument');
    }
  }

  getParams(method, uri, config) {
    // eslint-disable-next-line no-param-reassign
    config = config || { data: null };

    const url = (uri.substr(0, 4) === 'http')
      ? uri
      : this.server.prefix + uri;

    const params = {
      method,
      url,
      data: config.data || null,
      // headers: {
      //   Accept: 'application/json',
      //   'Content-Type': 'application/json',
      // },
      timeout: config.timeout || this.server.timeout,
    };

    if (uri !== this.urls.refreshToken && this.token.token) {
      params.headers = { Authorization: `Bearer ${this.token.token}` };
    }

    if (uri === this.urls.refreshToken && this.token.refreshToken) {
      params.headers = { Authorization: `Bearer ${this.token.refreshToken}` };
    }

    return params;
  }

  addRequestToQueue(request) {
    this.requests.push(request);
  }

  async getRefreshToken() {
    if (this.refreshRequest) {
      return;
    }
    this.refreshRequest = true;

    console.log('getRefreshToken', this.token);
    if (!this.token.refreshToken) {
      await this.login(this.credentials);
      this.executeRequests();
      // throw new Error('Refresh Token doesn`t exists');
    }

    let data = null;
    try {
      data = await this.post(this.urls.refreshToken);
    } catch (error) {
      console.log('getRefreshToken error', error);
      return;
    }
    console.log('getRefreshToken data', data);
    this.updateTokens(data);
    this.executeRequests();
    this.refreshRequest = false;
    console.log('getRefreshToken before emit');
    this.emit('refreshToken', data.user);
  }

  executeRequests() {
    let request = null;
    // eslint-disable-next-line no-cond-assign
    while (request = this.requests.shift()) {
      this.request(request.method, request.uri, request.config, request.cb);
    }
  }
}

export default Loader;
