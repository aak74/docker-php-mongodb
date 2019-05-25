const { asValue, Lifetime } = require('awilix');
const axios = require('axios');

const config = require('./config');

const IoC = require('./IoC');

const ioc = new IoC();

ioc.register({
  excludes: asValue([]),
  tokenTTL: asValue({ token: 3600, refreshToken: 3600 * 24 * 30 }),
  config: asValue(config),
  httpClient: asValue(axios),
});

const container = ioc.loadModules([
  'App.js',
  'utils/*.js',
  'model/*.js',
  'controller/*.js',
  'query/*.js',
  'command/*.js',
  'router/*.js',
  // 'model/__mocks__/*.js',
  // 'query/__mocks__/*.js',
  // 'command/__mocks__/*.js',
], {
  resolverOptions: {
    lifetime: Lifetime.SINGLETON,
  },
});

module.exports = container;
