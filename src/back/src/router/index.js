'use strict';

const bodyParser = require('body-parser');

class Routes {

  constructor({
    logger,
    httpServer,
    config,
    // projectModel,
    projectController
  }) {
    this.logger = logger;
    this.httpServer = httpServer;
    this.config = config;
    // this.projects = projectModel;
    this.projectController = projectController;
  }

  async run () {

    const self = this;
    this.httpServer.use('/status', (req, res, next) => {
      res.status(200).send('OK');
    });

    this.httpServer.get('/projects/:id', async (req, res) => {
      const data = await this.projectController.getProject({
        '_id': req.params.id
      });
      res.send({
        status: 'ok',
        data
      });
    });

    this.httpServer.get('/projects', async (_, res) => {
      const data = await this.projectController.getProjects();
      res.send({
        status: 'ok',
        data
      });
    });

    this.httpServer.post('/projects/:id', bodyParser.json(), async(req, res) => {
      console.log('post 0', req);
      console.log('post 1', req.body);
      // console.log('post 2', JSON.parse(req.body));
      
      const data = await this.projectController.updateProject({
        '_id': req.params.id
      }, req.body);
      // }, JSON.parse(req.body));
      res.send({ status: 'ok' });
    });

    this.httpServer.delete('/projects/:id', async (req, res) => {
      const data = await this.projectController.deleteProject({
        '_id': req.params.id
      });
      res.send({ status: 'ok' });
    });

    // this.httpServer.post('/projects', async (req, res) => {
    //   const data = await this.projectController.createProject(JSON.parse(req.body));
    //   res.send({ status: 'ok' });
    // });

    // this.httpServer.get('/projects/:id/backup', (req, res) => {
    //   const data = req.params;
    //   console.log('backup this -', data);
    //   queue.connect();
    //   queue.publish(`_id:${data}`, 'backup');
    //   res.send('ok');
    // });

    // this.httpServer.get('/server-status/', async (_, res) =>{
    //   self.logger.debug('server-status');
    //   const result = await this.projectController.getPage({name: 'arealidea'});
    //   res.send(result);
    // });

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
