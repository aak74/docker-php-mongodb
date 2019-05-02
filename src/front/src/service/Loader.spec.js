import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Loader from './Loader';
import Token from './TokenBase';

function getResponse(data) {
  return {
    status: 'ok',
    data,
  };
}

const context = {};
beforeEach(() => {
  const client = axios.create();
  context.mock = new MockAdapter(client);

  const token = new Token({
    token: 'TOKEN',
    refreshToken: 'REFRESH_TOKEN',
  });

  context.urls = {
    login: '/auth/login',
    refreshToken: '/auth/refresh',
  };

  context.loader = new Loader({
    client,
    token,
    urls: context.urls,
    server: {
      prefix: '',
      timeout: 5,
    },
  });
});

test('validateRequest throw error without method', () => {
  expect(context.loader.validateRequest).toThrowError(Error);
});

test('validateRequest throw error without uri', () => {
  const t = () => {
    context.loader.validateRequest('get');
  };
  expect(t).toThrowError(Error);
});

test('Correctly retries request when got 401 with new token', async () => {
  const { mock, loader } = context;
  const LOGIN_REQUEST = {
    login: 'foo',
    password: 'foo',
  };

  const LOGIN_RESPONSE = {
    token: 'TOKEN',
    refreshToken: 'REFRESH_TOKEN',
  };

  const REFRESH_REQUEST = {
    refreshToken: LOGIN_RESPONSE.refreshToken,
  };

  const REFRESH_RESPONSE = {
    token: 'TOKEN2',
    refreshToken: 'REFRESH_TOKEN2',
  };

  mock.onPost(context.urls.login, LOGIN_REQUEST).reply(200, getResponse(LOGIN_RESPONSE));
  // mock.onPost('/auth/refresh').reply(200, getResponse(REFRESH_RESPONSE));
  // console.log('mock', mock.handlers.post);

  mock
    .onPost(context.urls.refreshToken, REFRESH_REQUEST)
    .reply(200, getResponse(REFRESH_RESPONSE));
  // .replyOnce(200, getResponse(REFRESH_RESPONSE));

  mock.onGet('/users').reply(config => {
    const { Authorization: auth } = config.headers;
    if (auth === `Bearer ${LOGIN_RESPONSE.token}`) {
      return [401];
    }

    if (auth === `Bearer ${REFRESH_RESPONSE.token}`) {
      return [200, []];
    }
    return [401];
  });

  await loader.login(LOGIN_REQUEST);
  await loader.get('/users');

  expect(mock.history.get.length).toBe(2);
  expect(mock.history.get[1].headers.Authorization).toBe(`Bearer ${REFRESH_RESPONSE.token}`);
});
