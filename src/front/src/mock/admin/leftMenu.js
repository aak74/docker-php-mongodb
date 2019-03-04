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
        icon: 'ballot',
        title: localStorage.getItem('UserName'),
        link: '/login',
        description: null,
      },
    ],

  },
];
