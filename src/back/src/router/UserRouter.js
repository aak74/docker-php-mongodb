const bodyParser = require('body-parser');

const isAdmin = () => true;

let authMiddleware;
let self;

class UserRouter {
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

  // eslint-disable-next-line class-methods-use-this
  route(router) {
    router.get('/', async (req, res) => {
      res.send('1');

      // if (isAdmin(req.user.id)) {
      //   const result = await self.userController.usersGet(req.body);
      //   res.send(result);
      // } else {
      //   res.send({ message: 'Sorry this is private page' });
      // }
    });

    router.get('/isAdmin', async (req, res) => {
      res.send({ isAdmin: true });


      // if (isAdmin(req.user.id)) {
      //   res.send({ isAdmin: true });
      // } else {
      //   res.send({ isAdmin: false });
      // }
    });

    router.post('/register', bodyParser.json(), async (req, res) => {
      const result = await self.userController.register(req.body);
      res.send({ status: 'ok', data: result.login });
    });

    router.delete('/:id', async (req, res) => {
      if (isAdmin(req.user.id)) {
        const result = await self.userController.delete({
          _id: req.params.id,
        });
        res.send({ status: result, id: req.params.id });
      } else {
        res.send({ status: 'fail', id: req.params.id });
      }
    });

    router.post('/block/:id', async (req, res) => {
      if (isAdmin(req.user.id)) {
        const result = await self.userController.block({
          _id: req.params.id,
        });
        res.send({ status: result, id: req.params.id });
      } else {
        res.send({ status: 'fail', id: req.params.id });
      }
    });

    router.post('/unblock/:id', async (req, res) => {
      if (isAdmin(req.user.id)) {
        const result = await self.userController.unblock({
          _id: req.params.id,
        });
        res.send({ status: result, id: req.params.id });
      } else {
        res.send({ status: 'fail', id: req.params.id });
      }
    });
  }
}

module.exports = UserRouter;
