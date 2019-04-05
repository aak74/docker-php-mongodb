const { asClass, asValue, Lifetime } = require('awilix');
const axios = require('axios');
const express = require('express');
const http = require('http');
// const path = require('path');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');

// const auth = require('./auth/authorize');
const router = require('./router/router.js');
const config = require('./config');

const IoC = require('./IoC');
const ioc = new IoC;

const app = express();
const httpServer = http.createServer(app);

const io = socketIO(httpServer);

// app.use(express.static(path.join(__dirname, 'static')));

// app.enable('trust proxy');
// app.use(bodyParser.json());

// passport.use(auth);
// app.use(passport.initialize());
// app.use(bodyParser.urlencoded({
//   extended: true,
// }));
// app.use(bodyParser.json());  

ioc.register({
  excludes: asValue([]),
  config: asValue(config),
  httpClient: asValue(axios),
  httpServer: asValue(app),
  http: asValue(httpServer),
  socketIO: asValue(io),
  router: asClass(router),
  jwt: asValue(jwt),
  passport: asValue(passport),
  passportJWT: asValue(passportJWT),
  bodyParser: asValue(bodyParser),
});

const container = ioc.loadModules([
  'App.js',
  'utils/*.js',
  'model/*.js',
  'controller/*.js',
  'query/*.js',
  'command/*.js',
  // 'model/__mocks__/*.js',
  // 'query/__mocks__/*.js',
  // 'command/__mocks__/*.js',
], {
  resolverOptions: {
    lifetime: Lifetime.SINGLETON
  }
});

module.exports = container;
