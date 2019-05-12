export default {
  extraMenuItem: null,
  leftMenu: [],
  data: {
    items: [],
    headers: [],
    currentHeaders: [],
    history: [],
  },
  currentEntity: null,
  entities: null,
  status: {
    miniMenu: false,
    loading: false,
  },
  ui: {
    defaultPagination: [50, { text: 'All', value: -1 }],
    defaultControls: [
      {
        name: 'Edit', icon: 'edit', color: 'teal lighten-1', emit: 'editItem',
      },
      {
        name: 'Delete', icon: 'delete', color: 'pink lighten-2', emit: 'deleteItem',
      },
      {
        name: 'Backup', icon: 'backup', color: 'indigo lighten-2', emit: 'backupItem',
      },
    ],
  },
  loadFromBackend: false,
  // isUnauthorized: false,
  isUnauthorized: true,
  user: {
    login: 'foo',
    password: 'foo',
    isRemember: true,
  },
};
