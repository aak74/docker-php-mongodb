'use strict';

class Routes {

  constructor({
    logger,
    httpServer,
    config,
    projectModel,
    projectController
  }) {
    this.logger = logger;
    this.httpServer = httpServer;
    this.config = config;
    this.projects = projectModel;
    this.projectController = projectController;
  }

  async run () {

    const self = this;
    this.httpServer.use('/status', (req, res, next) => {
      res.status(200).send('OK');
    });

    this.httpServer.use('/projects/:id', async (req, res) => {
      const data = await this.projectController.getProject({
        '_id': req.params.id
      });
      res.send({
        status: 'ok',
        data
      });
    });

    this.httpServer.use('/projects', async (_, res) => {
      const data = await this.projectController.getProjects();
      res.send({
        status: 'ok',
        data
      });
    });

    this.httpServer.post('/projects', (req, res) => {
      const data = req.body;
      console.log(req);
      this.projects.create(data);
      res.send('ok');
    });

    this.httpServer.get('/projects/:id/backup', (req, res) => {
      const data = req.params;
      console.log('backup this -', data);
      queue.connect();
      queue.publish(`_id:${data}`, 'backup');
      res.send('ok');
    });

    this.httpServer.get('/projects/:id', (req, res) => {
      this.projects.findOne({ _id: req.params.id }, (err, data) => {
        console.log(data);
        res.send({
          status: 'ok',
          data
        });
      });
    });

    this.httpServer.delete('/projects/:id', (req, res) => {
      const data = req.params;
      console.log(data);
      this.projects.deleteOne({ _id: data.id }).exec();
      res.send('deleted');
    });

    this.httpServer.post('/projects/:id', (req, res) => {
      const data = req.body;
      // console.log(data);
      this.projects.find({ _id: data.id }).updateOne({ name: data.name, url: data.url }).exec();
      res.send('object saved');
    });

    this.httpServer.get('/server-status/', async (req, res) =>{
      self.logger.debug('server-status');
      const result = await this.projectController.getPage({name: 'arealidea'});
      res.send(result);
    });

    this.httpServer.all('*', function (req, res) {
      self.logger.error('Bad request', req.params);
      res.status(400).send('Bad request');
    });

    // this.httpServer.use('/', this.httpServer);

    this.httpServer.listen(this.config.port, (err) => {
      if (err) {
        self.logger.error(`Server error`, err);
        return;
      }
      self.logger.info(`Server is listening on ${this.config.port}`);
    })
  }
}

module.exports = Routes;
