module.exports = {
  port: 3000,
  // healthPeriod: 5,
  db: {
    url: 'mongodb://mongo',
    name: 'projects',
  },
  rabbit: {
    queues: {
      backup: {},
      backuped: {},
    },
  },
};
