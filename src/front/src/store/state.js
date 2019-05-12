import container from '../services/Container';

const projectModel = container.resolve('projectModel');

export default {
  current: {
    fields: [],
    data: [],
    id: null,
  },
  users: {},
  isAdmin: false,
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
    current: {
      history: {},
    },
    schema: projectModel.getSchema(),
  },
};
