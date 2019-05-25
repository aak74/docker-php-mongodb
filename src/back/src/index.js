const container = require('./ioc-prod');

const app = container.resolve('app');
app.run();
