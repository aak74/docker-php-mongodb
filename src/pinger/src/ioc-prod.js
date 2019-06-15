const { asValue, Lifetime } = require('awilix');
const axios = require('axios');

const config = require('./config');

const IoC = require('./IoC');

const ioc = new IoC();

ioc.register({
  excludes: asValue([]),
  config: asValue(config),
  token: asValue(process.env.TOKEN),
  httpClient: asValue(axios),
});

const container = ioc.loadModules([
  'App.js',
  'utils/!(*.spec)*.js',
  'model/!(*.spec)*.js',
  'query/!(*.spec)*.js',
  'command/!(*.spec)*.js',
  // 'model/__mocks__/!(*.spec)*.js',
], {
  resolverOptions: {
    lifetime: Lifetime.SINGLETON,
  },
});

module.exports = container;
