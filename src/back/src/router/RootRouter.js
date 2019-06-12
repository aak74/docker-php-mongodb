const express = require('express');
const bodyParser = require('body-parser');
require('../utils/RouterGroup.js');

let authMiddleware;

class RootRouter {
  constructor(injector) {
    this.logger = injector.logger;
    this.config = injector.config;

    this.app = express();
    this.authRouter = injector.authRouter;
    this.projectRouter = injector.projectRouter;
    this.userRouter = injector.userRouter;
    authMiddleware = injector.auth.authMiddleware();
  }

  async run() {
    this.app.group('/auth', [bodyParser.json(), this.logMiddleware()], this.authRouter.getRoute());
    this.app.group('/user', [authMiddleware, bodyParser.json(), this.logMiddleware()], this.userRouter.getRoute());
    this.app.group('/projects', [authMiddleware, bodyParser.json(), this.logMiddleware()], this.projectRouter.getRoute());

    this.app.listen(this.config.port, err => {
      if (err) {
        this.logger.error(['Server error', err]);
        return;
      }
      this.logger.info(`Server is listening on ${this.config.port}`);
    });

    this.app.get('/status', (_, res) => {
      res.status(200).send('OK');
    });
  }

  logMiddleware() {
    return (req, _, next) => {
      this.logger.info(req.url, req.body);
      next();
    };
  }
}

module.exports = RootRouter;
