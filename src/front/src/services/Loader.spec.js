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

const ctx = {
  LOGIN_REQUEST: { login: 'foo', password: 'foo' },
  LOGIN_RESPONSE: getResponse({ token: 'TOKEN', refreshToken: 'REFRESH_TOKEN' }),
  REFRESH_REQUEST: { refreshToken: 'REFRESH_TOKEN' },
  REFRESH_RESPONSE: getResponse({ token: 'TOKEN2', refreshToken: 'REFRESH_TOKEN2' }),
  TOKEN: { token: 'TOKEN', refreshToken: 'REFRESH_TOKEN' },
  urls: {
    login: '/auth/login',
    refreshToken: '/auth/refresh',
  },
};

beforeEach(() => {
  const client = axios.create();
  ctx.mock = new MockAdapter(client);

  const token = new Token(ctx.TOKEN);

  ctx.loader = new Loader({ token }, {
    client,
    urls: ctx.urls,
    server: {
      prefix: '',
      timeout: 5,
    },
  });
});

test('validateRequest throw error without method', () => {
  expect(ctx.loader.validateRequest).toThrowError(Error);
});

test('validateRequest throw error without uri', () => {
  const t = () => {
    ctx.loader.validateRequest('get');
  };
  expect(t).toThrowError(Error);
});

test('Login captures token information', async () => {
  const { mock, loader } = ctx;

  mock.onPost(ctx.urls.login, ctx.LOGIN_REQUEST).reply(200, ctx.LOGIN_RESPONSE);
  mock.onGet('/users').reply(200, []);

  await loader.login(ctx.LOGIN_REQUEST);
  await loader.get('/users');

  expect(mock.history.get.length).toBe(1);
  expect(mock.history.get[0].headers.Authorization).toBe(`Bearer ${ctx.LOGIN_RESPONSE.data.token}`);
});

test('Logout removes token information', async () => {
  const { mock, loader } = ctx;

  mock.onGet('/users').reply(200, []);

  await loader.logout();
  await loader.get('users');

  expect(mock.history.get.length).toBe(1);
  expect(mock.history.get[0].headers.Authorization).toBeFalsy();
});

test('Correctly retries request when got 401 with new token', async () => {
  const { mock, loader } = ctx;

  mock
    .onPost(ctx.urls.refreshToken, ctx.REFRESH_REQUEST)
    .replyOnce(200, ctx.REFRESH_RESPONSE);

  mock.onGet('/users').reply(config => {
    const { Authorization: auth } = config.headers;
    if (auth === `Bearer ${ctx.LOGIN_RESPONSE.data.token}`) {
      return [401];
    }

    if (auth === `Bearer ${ctx.REFRESH_RESPONSE.data.token}`) {
      return [200, []];
    }
    return [401];
  });

  await loader.get('/users');

  expect(mock.history.get.length).toBe(2);
  expect(mock.history.get[1].headers.Authorization).toBe(`Bearer ${ctx.REFRESH_RESPONSE.data.token}`);
});

test('Does not refresh token more than once', async () => {
  const { mock, loader } = ctx;

  mock
    .onPost(ctx.urls.refreshToken, ctx.REFRESH_REQUEST)
    .replyOnce(200, ctx.REFRESH_RESPONSE);

  mock.onGet('/users').reply(config => {
    const { Authorization: auth } = config.headers;
    if (auth === `Bearer ${ctx.LOGIN_RESPONSE.data.token}`) {
      return [401];
    }

    if (auth === `Bearer ${ctx.REFRESH_RESPONSE.data.token}`) {
      return [200, []];
    }
    return [401];
  });

  await Promise.all([loader.get('/users'), loader.get('/users')]);
  expect(mock.history.post.filter(({ url }) => url === ctx.urls.refreshToken).length).toBe(1);
});

test('Correctly fails request when got non-401 error', async () => {
  const { mock, loader } = ctx;
  mock.onGet('/users').reply(404);
  await expect(loader.get('users')).rejects.toThrow('Request failed with status code 404');
});
