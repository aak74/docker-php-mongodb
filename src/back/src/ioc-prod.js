const { asValue, Lifetime } = require('awilix');
const axios = require('axios');

const config = require('./config');

const IoC = require('./IoC');

const ioc = new IoC();

ioc.register({
  excludes: asValue([]),
  tokenTTL: asValue({ token: 3600, refreshToken: 3600 * 24 * 30 }),
  config: asValue(config),
  token: asValue(process.env.TOKEN),
  httpClient: asValue(axios),
});

const container = ioc.loadModules([
  'App.js',
  'utils/!(*.spec)*.js',
  'model/!(*.spec)*.js',
  'controller/!(*.spec)*.js',
  'query/!(*.spec)*.js',
  'command/!(*.spec)*.js',
  'router/!(*.spec)*.js',
  // 'model/__mocks__/!(*.spec)*.js',
  // 'query/__mocks__/!(*.spec)*.js',
  // 'command/__mocks__/!(*.spec)*.js',
], {
  resolverOptions: {
    lifetime: Lifetime.SINGLETON,
  },
});

module.exports = container;
