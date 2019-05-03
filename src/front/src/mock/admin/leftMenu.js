export default [
  {
    title: 'Главное',
    items: [
      {
        icon: 'dashboard',
        title: 'Рабочий стол',
        link: '/',
      },
      {
        icon: 'ballot',
        title: 'Проекты',
        link: '/projects/',
        description: null,
      },
      {
        icon: 'bar_chart',
        title: 'Состояние серверов',
        link: '/server-status/',
        description: null,
      },
      {
        icon: 'perm_identity',
        title: 'Выйти',
        link: '/logout',
        description: null,
      },
      {
        icon: 'perm_identity',
        title: 'Войти',
        link: '/login',
        description: null,
        isUnauthorized: true,
      },
    ],
  },
];
