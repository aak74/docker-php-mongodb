const bodyParser = require('body-parser');

let authMiddleware;
let self;

class AuthRouter {
  constructor({
    logger,
    auth,
    userController,
  }) {
    this.logger = logger;
    this.userController = userController;
    this.auth = auth;
    authMiddleware = auth.authMiddleware();
    self = this;
  }

  getToken(user) {
    return this.auth.getToken(user);
  }

  getRefreshToken(user) {
    return this.auth.getRefreshToken(user);
  }

  getTokensAndUser(user) {
    return {
      token: this.getToken(user),
      refreshToken: this.getRefreshToken(user),
      user,
    };
  }

  r() {
    return this.route;
  }

  // eslint-disable-next-line class-methods-use-this
  route(router) {
    router.post('/login', bodyParser.json(), async (req, res) => {
      console.log('/login', req.body, self);
      if (!req.body.login || !req.body.password) {
        res.status(400).json({ status: 'error', message: 'Empty login or password' });
        return;
      }

      const user = await self.userController.checkCredentials({
        login: req.body.login,
        password: req.body.password,
      });

      if (!user) {
        res.status(404).json({ status: 'error', message: 'Login or password not found' });
        return;
      }

      res.status(200).json({
        status: 'ok',
        data: self.getTokensAndUser(user),
      });
    });

    router.get('/checkToken', authMiddleware, async (req, res) => {
      res.status(200).json({ status: 'ok', data: req.user });
    });

    router.post('/refreshToken', authMiddleware, async (req, res) => {
    // router.post('/refreshToken', async (req, res) => {
      self.logger.debug('refreshToken', req.user);
      if (!req.user) {
        res.json({ message: 'User not found' });
        return;
      }

      res.status(200).json({
        status: 'ok',
        data: self.getTokensAndUser(req.user),
      });
    });

    router.get('/users', async (req, res) => {
      res.send('1');

      // if (isAdmin(req.user.id)) {
      //   const result = await self.userController.usersGet(req.body);
      //   res.send(result);
      // } else {
      //   res.send({ message: 'Sorry this is private page' });
      // }
    });
  }
}

module.exports = AuthRouter;
