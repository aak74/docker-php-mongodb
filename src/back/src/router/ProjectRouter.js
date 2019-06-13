const Router = require('./Router');

class ProjectRouter extends Router {
  constructor({ projectController }) {
    super(projectController);
  }

  route(router) {
    router.get('/', async (req, res) => {
      if (!req.user.id) {
        this.sendError(res, 404, 'Projects not found');
        return;
      }
      try {
        console.log(this.get);
        const data = await this.get('getProjects', { userId: req.user.id });
        this.send200(res, data);
      } catch (err) {
        this.send500(res, err);
      }
    });

    router.get('/:id', async (req, res) => {
      console.log('projects/id', req.params, req.user);

      const data = await this.get('getProject', {
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
        await this.execute('createProject', data);
        this.send200(res);
      } catch (err) {
        this.send500(res, err);
      }
    });

    router.post('/:id', async (req, res) => {
      try {
        await this.execute('updateProject', { _id: req.params.id }, req.body);
        this.send200(res);
      } catch (err) {
        this.send500(res, err);
      }
    });

    router.delete('/:id', async (req, res) => {
      try {
        const data = await this.execute('deleteProject', { _id: req.params.id });
        this.send200(res, data);
      } catch (err) {
        this.send500(res, err);
      }
    });

    router.get('/:id/backup', async (req, res) => {
      try {
        const data = await this.execute('backupProject', {
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
