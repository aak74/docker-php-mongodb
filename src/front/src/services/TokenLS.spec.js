import Token from './TokenLS';

test('Token and RefreshToken are same as set after constructor', async () => {
  const token = new Token();
  token.token = 'newToken';
  expect(token.token).toBe('newToken');
  token.refreshToken = 'newRefreshToken';
  expect(token.refreshToken).toBe('newRefreshToken');
});
