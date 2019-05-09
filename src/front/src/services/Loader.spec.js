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
  REFRESH_RESPONSE: getResponse({ token: 'TOKEN2', refreshToken: 'REFRESH_TOKEN2', user: { login: 'foo', id: 1 } }),
  TOKEN: { token: 'TOKEN', refreshToken: 'REFRESH_TOKEN' },
  urls: {
    login: '/auth/login',
    refreshToken: '/auth/refresh',
  },
};

describe('General tests', () => {
  beforeEach(() => {
    const client = axios.create();
    ctx.mock = new MockAdapter(client);

    const token = new Token(ctx.TOKEN);

    ctx.loader = new Loader({
      token,
      urls: ctx.urls,
      server: {
        prefix: '',
        timeout: 5,
      },
      client,
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

  test('Login return tokens', async () => {
    const { mock, loader } = ctx;

    mock.onPost(ctx.urls.login, ctx.LOGIN_REQUEST).reply(200, ctx.LOGIN_RESPONSE);

    const response = await loader.login(ctx.LOGIN_REQUEST);

    expect(mock.history.post.length).toBe(1);
    expect(response).toMatchObject({ token: 'TOKEN', refreshToken: 'REFRESH_TOKEN' });
  });


  test('Login return tokens for x-www-form-urlencoded', async () => {
    const { mock, loader } = ctx;

    mock.onPost(ctx.urls.login)
      .reply(config => {
        if (config.data === 'login=foo&password=foo') {
          return [200, { token: 'TOKEN', refreshToken: 'REFRESH_TOKEN' }];
        }
        return [400];
      });

    const response = await loader.login({ data: ctx.LOGIN_REQUEST, form: true });

    expect(mock.history.post.length).toBe(1);
    expect(response).toMatchObject({ token: 'TOKEN', refreshToken: 'REFRESH_TOKEN' });
  });

  test('Login captures token information', async () => {
    const { mock, loader } = ctx;

    mock.onPost(ctx.urls.login, ctx.LOGIN_REQUEST).reply(200, ctx.LOGIN_RESPONSE);
    mock.onGet('/users').reply(200, []);

    await loader.login(ctx.LOGIN_REQUEST);
    await loader.get('/users');

    expect(mock.history.post.length).toBe(1);
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
      .onPost(ctx.urls.refreshToken)
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

    expect(mock.history.post.length).toBe(1);
    expect(mock.history.get.length).toBe(2);
    expect(mock.history.get[1].headers.Authorization).toBe(`Bearer ${ctx.REFRESH_RESPONSE.data.token}`);
  });

  test('Does not refresh token more than once', async () => {
    const { mock, loader } = ctx;

    mock
      .onPost(ctx.urls.refreshToken)
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

  test('Refresh token with refreshToken in header', async () => {
    const { mock, loader } = ctx;

    mock.onPost(ctx.urls.refreshToken)
      .reply(config => {
        const { Authorization: auth } = config.headers;
        if (auth === `Bearer ${ctx.LOGIN_RESPONSE.data.refreshToken}`) {
          return [200, []];
        }
        return [401];
      });

    await loader.post(ctx.urls.refreshToken);

    expect(mock.history.post.length).toBe(1);
    expect(mock.history.post[0].headers.Authorization).toBe(`Bearer ${ctx.LOGIN_RESPONSE.data.refreshToken}`);
  });

  test('Emit event refreshToken after refreshing token', async () => {
    const { mock, loader } = ctx;

    mock
      .onPost(ctx.urls.refreshToken)
      .replyOnce(200, ctx.REFRESH_RESPONSE);

    let userLogin = '';
    loader.on('refreshToken', user => {
      userLogin = user.login;
    });
    await loader.getRefreshToken();

    expect(userLogin).toBe(ctx.REFRESH_RESPONSE.data.user.login);
  });

  test('Request formed correctly for x-www-form-urlencoded', async () => {
    const { mock, loader } = ctx;

    mock
      .onGet('/users')
      .reply(200, getResponse());

    const data = { a: 1, b: 2 };
    await loader.get('/users', { data, form: true });

    expect(mock.history.get[0].headers['Content-Type']).toBe('application/x-www-form-urlencoded');
    expect(mock.history.get[0].data).toBe('a=1&b=2');
  });

  test('Request formed correctly for not x-www-form-urlencoded', async () => {
    const { mock, loader } = ctx;

    mock
      .onPost('/data')
      .reply(200, getResponse());

    const data = { a: 1, b: 2 };
    await loader.post('/data', { data });

    expect(mock.history.post[0].data).toBe("{\"a\":1,\"b\":2}");
  });

  test('Response with data in object return this data', async () => {
    const { mock, loader } = ctx;

    const data = { status: 'ok', data: { a: 1, b: 2 } };
    mock
      .onPost('/data')
      .reply(200, data);

    const response = await loader.post('/data');

    expect(response).toMatchObject(data.data);
  });

  test('Response without data in object return this very object', async () => {
    const { mock, loader } = ctx;

    const data = { a: 1, b: 2 };
    mock
      .onPost('/data')
      .reply(200, data);

    const response = await loader.post('/data');

    expect(response).toMatchObject(data);
  });

});

describe('Custom tests', () => {
  test('Emit Unauthorized when empty refreshToken', async () => {
    const client = axios.create();
    const mock = new MockAdapter(client);
    const token = new Token({ token: 'TOKEN', refreshToken: null });

    const loader = new Loader({
      token,
      urls: ctx.urls,
      server: {
        prefix: '',
        timeout: 5,
      },
      client,
    });

    let isUnauthorized = false;
    loader.on('Unauthorized', () => {
      isUnauthorized = true;
    });
    await loader.getRefreshToken();

    expect(isUnauthorized).toBeTruthy();
    expect(mock.history.post.length).toBe(0);
  });

  test('Renamed default token names', async () => {
    const token = new Token(ctx.TOKEN);
    const loader = new Loader({
      token,
      urls: ctx.urls,
      server: {
        prefix: '',
        timeout: 5,
      },
    });

    expect(loader.getTokensObject(ctx.TOKEN)).toMatchObject(ctx.TOKEN);
  });

  test('Renamed custom token names', async () => {
    const token = new Token(ctx.TOKEN);
    const loader = new Loader({
      token,
      urls: ctx.urls,
      server: {
        prefix: '',
        timeout: 5,
      },
      tokenNames: {
        token: 'access_token',
        refreshToken: 'refresh_token',
      },
    });
    const customTokens = { access_token: 'TOKEN', refresh_token: 'REFRESH_TOKEN'}
    expect(loader.getTokensObject(customTokens)).toMatchObject(ctx.TOKEN);
  });
});

describe('Does not have refresh token url', () => {
  beforeEach(() => {
    const client = axios.create();
    ctx.mock = new MockAdapter(client);

    const token = new Token(ctx.TOKEN);

    ctx.loader = new Loader({
      token,
      urls: {
        login: '/auth/login',
      },
      server: {
        prefix: '',
        timeout: 5,
      },
      client,
    });
  });

  test('Emit Unauthorized when 401', async () => {
    const { mock, loader } = ctx;

    mock
      .onGet('/users')
      .reply(401);

    let isUnauthorized = false;
    loader.on('Unauthorized', () => {
      isUnauthorized = true;
    });
    await loader.get('/users');

    expect(isUnauthorized).toBeTruthy();
    expect(mock.history.post.length).toBe(0);
    expect(mock.history.get.length).toBe(1);
  });
});  
