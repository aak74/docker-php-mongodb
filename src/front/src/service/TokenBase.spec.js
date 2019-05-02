import Token from './TokenBase';

test('New Token without properly params throw error', async () => {
  const t = () => {
    // eslint-disable-next-line
    new Token();
  };
  expect(t).toThrowError(TypeError);
});

test('Token and RefreshToken are same as set in constructor', async () => {
  const token = new Token({ token: 'token', refreshToken: 'refreshToken' });
  expect(token.token).toBe('token');
  expect(token.refreshToken).toBe('refreshToken');
});

test('Token and RefreshToken are same as set after constructor', async () => {
  const token = new Token({ token: 'token', refreshToken: 'refreshToken' });
  token.token = 'newToken';
  expect(token.token).toBe('newToken');
  token.refreshToken = 'newRefreshToken';
  expect(token.refreshToken).toBe('newRefreshToken');
});
