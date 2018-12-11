const container = require('./ioc-prod');
// console.log(container);

const logger = container.resolve('logger');
logger.info(`Server started`);
// return;
const db = container.resolve('db');
db.connect().then(() => {
  const router = container.resolve('router');
  router.run();
  // const main = container.resolve('main');
  // main.run();
})
