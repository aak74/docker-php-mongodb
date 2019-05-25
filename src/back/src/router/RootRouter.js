/* eslint-disable max-len */
const express = require('express');
const bodyParser = require('body-parser');
require('../utils/RouterGroup.js');

const security = 'ArealIdea';

let authMiddleware;

class Router {
  constructor({
    logger,
    config,
    historyController,
    auth,
    authRouter,
    projectRouter,
    userRouter,
  }) {
    this.logger = logger;
    this.config = config;
    this.historyController = historyController;

    this.app = express();
    authMiddleware = auth.authMiddleware();
    this.authRouter = authRouter;
    this.projectRouter = projectRouter;
    this.userRouter = userRouter;
  }

  async run() {
    const self = this;
    /*
    const isBlocked =  async function (req,res,next){
      const params = {
        login:req.user.login,
        blocked:true,
      };
      const result = await self.userController.login(params);
      if (result){
        res.status(401).json({ message: 'you are blocked' });
        return
      }
      next();
    };
*/
    // this.app.all('/', function(_, res) {
    //   res.header("Access-Control-Allow-Origin", "*");
    //   res.header("Access-Control-Allow-Headers", "X-Requested-With");
    // });

    this.app.group('/auth', this.authRouter.route);
    this.app.group('/user', this.userRouter.route);
    this.app.group('/projects', this.projectRouter.route);

    this.app.listen(this.config.port, err => {
      if (err) {
        self.logger.error('Server error', err);
        return;
      }
      self.logger.info(`Server is listening on ${this.config.port}`);
    });

    // this.app.get('/status', (_, res) => {
    //   console.log('status', _);

    //   res.status(200).send('OK');
    // });

    // this.io.sockets.on('connection',function (socket) {
    //   socket.on('autorized', function (user) {
    //     socket.user=user.user;
    //     socket.join(socket.user);
    //   });
    //   socket.on('message', function (msg) {
    //   });

    //   socket.on('disconnect', function () {
    //   });
    // });
  }
}

module.exports = Router;
