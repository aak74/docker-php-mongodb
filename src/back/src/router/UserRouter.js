const Router = require('./Router');

const isAdmin = () => true;

function adminMiddleware(req, _, next) {
  if (!isAdmin(req.user.id)) {
    throw new Error('Forbidden');
  }
  next();
}

class UserRouter extends Router {
  constructor({ userController }) {
    super(userController);
  }

  route(router) {
    router.get('/', async (_, res) => {
      this.sendError(res, 403, 'Forbidden');
    });

    router.post('/register', async (req, res) => {
      try {
        const data = await this.execute('register', req.body);
        this.send200(res, data.login);
      } catch (err) {
        this.send500(res, err);
      }
    });

    router.delete('/:id', adminMiddleware, async (req, res) => {
      try {
        const data = await this.execute('delete', {
          _id: req.params.id,
        });
        this.send200(res, data);
      } catch (err) {
        this.send500(res, err);
      }
    });

    router.post('/:id/block', adminMiddleware, async (req, res) => {
      try {
        const data = await this.execute('block', {
          _id: req.params.id,
        });
        this.send200(res, data);
      } catch (err) {
        this.send500(res, err);
      }
    });

    router.post('/:id/unblock', adminMiddleware, async (req, res) => {
      try {
        const data = await this.execute('unblock', {
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
