module.exports = {
  port: 3000,
  // healthPeriod: 5,
  db: {
    url: 'mongodb://pr-mongodb',
    name: 'projects',
  },
  rabbit: {
    queues: {
      'backup': {},
      'backuped': {},
    },
  },
}
