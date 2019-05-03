import { createContainer, asValue, asClass } from 'awilix';

import Loader from './Loader';
import Token from './TokenLS';

// const token = new Token();
// const loader = new Loader({ token });

// console.log({ createContainer });


const container = createContainer();

container.register({
  token: asClass(Token),
  loader: asClass(Loader),
});

// const loader = window.$container.resolve('loader');
// loader.login({ login: 'foo', password: 'foo' });
// window.$container.build();

export default container;
