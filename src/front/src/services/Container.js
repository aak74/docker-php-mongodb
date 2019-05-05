import { createContainer, asClass, Lifetime } from 'awilix';

import Loader from './Loader';
import Token from './TokenLS';

// const token = new Token();
// const loader = new Loader({ token });

// console.log({ createContainer });


const container = createContainer();

container.register({
  token: asClass(Token).setLifetime(Lifetime.SINGLETON),
  loader: asClass(Loader).setLifetime(Lifetime.SINGLETON),
});

// const loader = container.resolve('loader');

// export loader;

export default container;
