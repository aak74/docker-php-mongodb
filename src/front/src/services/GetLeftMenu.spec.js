import getLeftMenu from './GetLeftMenu';

const ctx = {};
// beforeEach(() => {
ctx.LEFT_MENU = [
  {
    title: 'Main',
    items: [
      {
        title: 'dashboard',
        link: '/',
      },
      {
        title: 'Logout',
        link: '/logout',
        description: null,
      },
      {
        title: 'Login',
        link: '/login',
        description: null,
        forUnauthorized: true,
      },
    ],
  },
];
// });

test('Call function without properly params throw error', async () => {
  expect(getLeftMenu).toThrowError(Error);
});

test('Returns one menu items for an unauthorized user', async () => {
  const menu = getLeftMenu(ctx.LEFT_MENU, true);
  expect(menu.length).toBe(1);
  expect(menu[0].items.length).toBe(1);
});

test('Returns two menu items for an authorized user', async () => {
  const menu = getLeftMenu(ctx.LEFT_MENU, false);
  expect(menu.length).toBe(1);
  expect(menu[0].items.length).toBe(2);
});

/*

test('Token and RefreshToken are same as set after constructor', async () => {
  const token = new Token({ token: 'token', refreshToken: 'refreshToken' });
  token.token = 'newToken';
  expect(token.token).toBe('newToken');
  token.refreshToken = 'newRefreshToken';
  expect(token.refreshToken).toBe('newRefreshToken');
});
*/
