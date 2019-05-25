const express = require('express');
require('../utils/RouterGroup.js');

class Router {
  constructor({
    logger,
    config,
    authRouter,
    projectRouter,
    userRouter,
  }) {
    this.logger = logger;
    this.config = config;

    this.app = express();
    this.authRouter = authRouter;
    this.projectRouter = projectRouter;
    this.userRouter = userRouter;
  }

  async run() {
    const self = this;
    this.app.group('/auth', this.authRouter.route);
    this.app.group('/user', this.userRouter.route);
    this.app.group('/projects', this.projectRouter.route);

    this.app.listen(this.config.port, err => {
      if (err) {
        self.logger.error(['Server error', err]);
        return;
      }
      self.logger.info(`Server is listening on ${this.config.port}`);
    });

    this.app.get('/status', (_, res) => {
      res.status(200).send('OK');
    });
  }
}

module.exports = Router;
