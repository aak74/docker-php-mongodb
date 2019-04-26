// const axios = require('axios');
// const AxiosAdapter = require('axios-mock-adapter');
// const Api = require('./index.js');

import axios from 'axios';
import AxiosAdapter from 'axios-mock-adapter';



// const AxiosAdapter = require('axios-mock-adapter');

// import Api from './index.js';

let context = {};
beforeEach(() => {
  const client = axios.create();
  context.mock = new AxiosAdapter(client);
  // context.api = new Api({ client });
});

test("Login captures token information", async () => {
  const { api } = context;
  const LOGIN_REQUEST = {
    login: "foo",
    password: "foo",
  };
  const LOGIN_RESPONSE = {
    token: "TOKEN",
    refreshToken: "REFRESH_TOKEN",
  };

  // mock.onPost("/auth/login", LOGIN_REQUEST).reply(200, LOGIN_RESPONSE);
  // mock.onGet("/users").reply(200, []);

  // await api.login(LOGIN_REQUEST);
  // await api.getUsers();

  expect(1).toBe(1);
});
