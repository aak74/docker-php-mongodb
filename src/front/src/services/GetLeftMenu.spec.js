import getLeftMenu from './GetLeftMenu';

const ctx = {
  LEFT_MENU: [
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
  ],
};

test('Call function without properly params throw error', () => {
  expect(getLeftMenu).toThrowError(new Error('Bad parameters'));
});

test('Returns one menu items for an unauthorized user', () => {
  const menu = getLeftMenu(ctx.LEFT_MENU, true);
  expect(menu.length).toBe(1);
  expect(menu[0].items.length).toBe(1);
});

test('Returns two menu items for an authorized user', () => {
  const menu = getLeftMenu(ctx.LEFT_MENU, false);
  expect(menu.length).toBe(1);
  expect(menu[0].items.length).toBe(2);
});
