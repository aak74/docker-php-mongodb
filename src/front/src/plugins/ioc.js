import { createContainer, asValue, asClass } from 'awilix';

import Loader from '../services/Loader';
import Token from '../services/TokenLS';

// const token = new Token();
// const loader = new Loader({ token });

// console.log({ createContainer });


window.$container = createContainer();

window.$container.register({
  token: asClass(Token),
  loader: asClass(Loader),
});

const loader = window.$container.resolve('loader');
loader.login({ login: 'foo', password: 'foo' });
// window.$container.build();
