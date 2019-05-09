import axios from 'axios';
import {
  createContainer, asClass, Lifetime, asValue,
} from 'awilix';

import Loader from './Loader';
import Token from './TokenLS';
import ProjectModel from '../models/Project';

const container = createContainer();

container.register({
  urls: asValue({ login: 'auth/login', refreshToken: 'auth/refreshToken' }),
  server: asValue({ prefix: '/api/v1/', timeout: 30000 }),
  tokenNames: asValue({ token: 'token', refreshToken: 'refreshToken' }),
  client: asValue(axios),
  token: asClass(Token).setLifetime(Lifetime.SINGLETON),
  loader: asClass(Loader).setLifetime(Lifetime.SINGLETON),
  projectModel: asClass(ProjectModel).setLifetime(Lifetime.SINGLETON),
});

export default container;
