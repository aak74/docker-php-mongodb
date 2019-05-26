const bodyParser = require('body-parser');

let authMiddleware;
let self;

class ProjectRouter {
  constructor({
    logger,
    auth,
    projectController,
  }) {
    this.logger = logger;
    this.projectController = projectController;
    this.auth = auth;
    authMiddleware = auth.authMiddleware();
    self = this;
  }

  // eslint-disable-next-line class-methods-use-this
  route(router) {
    router.get('/', authMiddleware, async (req, res) => {
      // self.logger.debug('/', req.user);
      if (!req.user.id) {
        res.status(404).send({ status: 'ok', data: [] });
        return;
      }
      let data;
      try {
        data = await self.projectController.getList({ userId: req.user.id });
      } catch (err) {
        self.logger.error(['err', err]);
        res.status(500).send({ status: 'error' });
        return;
      }
      res.send({
        status: 'ok',
        data,
      });
    });

    router.get('/:id', authMiddleware, async (req, res) => {
      console.log('projects/id', req.params, req.user);

      const data = await self.projectController.get({
        _id: req.params.id,
        userId: req.user.id,
      });

      // const History = await self.historyController.getHistory({
      //   id: req.params.id
      // });
      // data.history = History.history;
      // data.backup= History.historyBackup;
      res.send({
        status: 'ok',
        data,
      });
    });

    router.post('/', authMiddleware, bodyParser.json(), async (req, res) => {
      console.log('createProject');

      const data = req.body;
      data.userId = req.user.id;
      await self.projectController.create(data);
      res.send({ status: 'ok' });
    });

    router.post('/:id', authMiddleware, bodyParser.json(), async (req, res) => {
      console.log('updateProject');
      await self.projectController.update({ _id: req.params.id }, req.body);
      res.send({ status: 'ok' });
    });

    router.delete('/:id', authMiddleware, bodyParser.json(), async (req, res) => {
      console.log('/:id', req.query, req.params);

      const result = await self.projectController.delete({ _id: req.params.id });

      if (result) {
        res.send({ status: 'ok' });
        return;
      }

      res.send({ status: 'error' });
    });

    router.get('/history', async (req, res) => {
      const data = await self.projectController.getList();
      res.send({
        status: 'ok',
        data,

      });
    });

    // router.post('/:id/backup/history', async (req, res) => {
    //   console.log(req.params.key)
    //   const data={
    //     '_id': req.params.id,
    //     time: new Date(),
    //   };
    //   const resultUpdate = await self.historyController.sendHistory(data);
    //   //const resultUpdate = await self.projectController.updateStatus(data);
    //   self.io.sockets.in(req.params.user).emit('message', {msg: 'Бекап проекта '+req.params.ProjectName+' успешно завершен'});
    //   return true
    // });

    router.get(
      '/:id/backup',
      authMiddleware,
      async (req, res) => {
        try {
          const result = await self.projectController.backup({
            _id: req.params.id,
            userId: req.user.id,
          });
          if (result) {
            res.send({ status: 'ok' });
            return;
          }
          res.send({ status: 'error', message: 'Unknown Error' });
        } catch (error) {
          res.send({ status: 'error', message: error.message });
        }
      },
    );

    // router.post('/:id/status', async (req, res) => {
    //   const result = await self.historyController.sendHistory(req.body);
    //   const resultUpdate = await self.projectController.updateStatus(req.body);
    //   res.send({ status: 'ok' });
    // });

    // router.get('/users' , async (req, res) => {
    //   const result = await self.historyController.sendHistory(req.body);
    //   const resultUpdate = await self.projectController.updateStatus(req.body);
    //   res.send({ status: 'ok' });
    // });
  }
}

module.exports = ProjectRouter;
