const Router = require('./Router');

const isAdmin = () => true;

function adminMiddleware(req, _, next) {
  if (!isAdmin(req.user.id)) {
    throw new Error('Forbidden');
  }
  next();
}

class UserRouter extends Router {
  constructor(injector) {
    super();
    this.logger = injector.logger;
    this.userController = injector.userController;
    this.auth = injector.auth;
  }

  // eslint-disable-next-line class-methods-use-this
  route(router) {
    router.get('/', async (_, res) => {
      this.sendError(res, 403, 'Forbidden');
    });

    router.get('/isAdmin', async (_, res) => {
      res.send({ isAdmin: true });
    });

    router.post('/register', async (req, res) => {
      try {
        const result = await this.userController.register(req.body);
        res.send({ status: 'ok', data: result.login });
      } catch (err) {
        this.send500(res, err);
      }
    });

    router.delete('/:id', adminMiddleware, async (req, res) => {
      try {
        const data = await this.userController.delete({
          _id: req.params.id,
        });
        this.send200(res, data);
      } catch (err) {
        this.send500(res, err);
      }
    });

    router.post('/block/:id', adminMiddleware, async (req, res) => {
      try {
        const data = await this.userController.block({
          _id: req.params.id,
        });
        this.send200(res, data);
      } catch (err) {
        this.send500(res, err);
      }
    });

    router.post('/unblock/:id', adminMiddleware, async (req, res) => {
      try {
        const data = await this.userController.unblock({
          _id: req.params.id,
        });
        this.send200(res, data);
      } catch (err) {
        this.send500(res, err);
      }
    });
  }
}

module.exports = UserRouter;
