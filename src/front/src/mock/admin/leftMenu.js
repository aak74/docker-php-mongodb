function UserName() {
  const user = localStorage.getItem('UserName');
  if (user) {
    return user;
  }
  return 'Войти';
}
function EnableMenuItems() {
  const user = localStorage.getItem('UserName');
  if (user) {
    return [
      {
        icon: 'perm_identity',
        title: UserName(),
        link: '/login',
        description: null,
      },
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
    ];
  }
  return [{
  icon : 'input',
  title : UserName(),
  link: '/login',
  description: null,
  }];
}

export default [
  {
    title: 'Главное',
    computed: {
    },
    data() {
      return {
        UserCurrentName: UserName(),
      };
    },
    items: EnableMenuItems(),

  },
];
