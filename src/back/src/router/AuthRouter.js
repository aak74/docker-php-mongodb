const Router = require('./Router');

class AuthRouter extends Router {
  constructor(injector) {
    super();
    this.logger = injector.logger;
    this.auth = injector.auth;
    this.userController = injector.userController;
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

  route(router) {
    router.post('/login', async (req, res) => {
      console.log('/login', req.body);
      if (!req.body.login || !req.body.password) {
        this.sendError(res, 400, 'Empty login or password');
        return;
      }
      try {
        const user = await this.userController.checkCredentials({
          login: req.body.login,
          password: req.body.password,
        });

        if (!user) {
          this.sendError(res, 404, 'Login or password not found');
          return;
        }
        this.send200(res, this.getTokensAndUser(user));
      } catch (err) {
        this.send500(res, err);
      }
    });

    router.get('/checkToken', async (req, res) => {
      this.send200(res, req.user);
    });

    router.post('/refreshToken', async (req, res) => {
      this.logger.debug('refreshToken', req.user);
      if (!req.user) {
        this.sendError(res, 404, 'User not found');
        return;
      }
      this.send200(res, this.getTokensAndUser(req.user));
    });
  }
}

module.exports = AuthRouter;
