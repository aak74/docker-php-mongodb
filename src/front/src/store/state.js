export default {
  status: {
    loading: true,
  },
  error: null,
  chartSize: {
    currentLoad: 15,
    loadAverage: 15,
    memoryUsage: 15,
    status: 25,
  },
  appStatus: {
    created: 0,
    docker: {
      services: [],
      info: {
        Containers: 0,
        ContainersRunning: 0,
        ContainersPaused: 0,
        ContainersStopped: 0,
      },
    },
    system: {
      load: {
        uptime: 0,
        currentload: 0,
        avgload: [0, 0, 0],
      },
      memory: {},
      disk: {},
      queues: [],
    },
  },
  historyHeaders: [
    {
      text: 'Время вх.запроса',
      value: 'timeSet',
    }, {
      text: 'Время в очереди',
      value: 'timeInQueue',
    },
  ],
  queuesAvailable: ['backup', 'backuped'],
  projects: [],
  project: {
    current: {},
    schema: {
      fields: [
        {
          type: 'input',
          inputType: 'text',
          label: 'ID',
          model: '_id',
          readonly: true,
          disabled: true,
        },
        {
          type: 'input',
          inputType: 'text',
          label: 'Name',
          model: 'name',
          placeholder: 'Project name',
          required: true,
        },
        {
          type: 'input',
          inputType: 'text',
          label: 'Url',
          model: 'url',
          placeholder: 'Enter url',
          required: true,
        },
        {
          type: 'input',
          inputType: 'password',
          label: 'Password',
          model: 'password',
          min: 6,
          required: true,
          hint: 'Minimum 6 characters',
          // validator: VueFormGenerator.validators.string
        },
        {
          type: 'checkbox',
          label: 'isActive',
          model: 'isActive',
          default: true,
        },
      ],
    },
  },
  ui: {
    defaultPagination: [20, 50, { text: 'All', value: -1 }],
    defaultControls: [
      {
 name: 'Edit', icon: 'edit', color: 'teal lighten-1', emit: 'editItem'
},
      {
 name: 'Delete', icon: 'delete', color: 'pink lighten-2', emit: 'deleteItem'
},
      {
 name: 'Backup', icon: 'backup', color: 'indigo lighten-2', emit: 'backupItem'
},
    ],
  },
};
