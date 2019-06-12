const Router = require('./Router');

class ProjectRouter extends Router {
  constructor(injector) {
    super();
    this.logger = injector.logger;
    this.projectController = injector.projectController;
    this.auth = injector.auth;
  }

  route(router) {
    router.get('/', async (req, res) => {
      if (!req.user.id) {
        this.sendError(res, 404, 'Projects not found');
        return;
      }
      try {
        const data = await this.projectController.getList({ userId: req.user.id });
        this.send200(res, data);
      } catch (err) {
        this.logger.error(['err', err]);
        this.send500(res, err);
      }
    });

    router.get('/:id', async (req, res) => {
      console.log('projects/id', req.params, req.user);

      const data = await this.projectController.get({
        _id: req.params.id,
        userId: req.user.id,
      });

      // const History = await this.historyController.getHistory({
      //   id: req.params.id
      // });
      // data.history = History.history;
      // data.backup= History.historyBackup;
      this.send200(res, data);
    });

    router.post('/', async (req, res) => {
      try {
        const data = req.body;
        data.userId = req.user.id;
        await this.projectController.create(data);
        this.send200(res);
      } catch (err) {
        this.send500(res, err);
      }
    });

    router.post('/:id', async (req, res) => {
      try {
        await this.projectController.update({ _id: req.params.id }, req.body);
        this.send200(res);
      } catch (err) {
        this.send500(res, err);
      }
    });

    router.delete('/:id', async (req, res) => {
      try {
        const data = await this.projectController.delete({ _id: req.params.id });
        this.send200(res, data);
      } catch (err) {
        this.send500(res, err);
      }
    });

    router.get('/history', async (_, res) => {
      try {
        const data = await this.projectController.getList();
        this.send200(res, data);
      } catch (err) {
        this.send500(res, err);
      }
    });

    router.get('/:id/backup', async (req, res) => {
      try {
        const data = await this.projectController.backup({
          _id: req.params.id,
          userId: req.user.id,
        });
        this.send200(res, data);
      } catch (err) {
        this.send500(res, err);
      }
    });
  }
}

module.exports = ProjectRouter;
