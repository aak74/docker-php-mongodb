'use strict';

const bodyParser = require('body-parser');

class Routes {

  constructor({
    logger,
    httpServer,
    config,
    projectController
  }) {
    this.logger = logger;
    this.httpServer = httpServer;
    this.config = config;
    this.projectController = projectController;
  }

  async run () {

    const self = this;
    this.httpServer.use('/status', (_, res) => {
      res.status(200).send('OK');
    });

    this.httpServer.get('/projects/:id', async (req, res) => {
      const data = await this.projectController.get({
        '_id': req.params.id
      });
      res.send({
        status: 'ok',
        data
      });
    });

    this.httpServer.get('/projects', async (_, res) => {
      const data = await this.projectController.getList();
      res.send({
        status: 'ok',
        data
      });
    });

    this.httpServer.post('/projects/:id', bodyParser.json(), async(req, res) => {
      const _ = await this.projectController.update({
        '_id': req.params.id
      }, req.body);
      res.send({ status: 'ok' });
    });

    this.httpServer.delete('/projects/:id', async (req, res) => {
      const _ = await this.projectController.delete({
        '_id': req.params.id
      });
      res.send({ status: 'ok' });
    });

    this.httpServer.post('/projects', bodyParser.json(), async (req, res) => {
      const _ = await this.projectController.create(req.body);
      res.send({ status: 'ok' });
    });

    this.httpServer.get('/projects/:id/backup', async (req, res) => {
      const _ = await this.projectController.backup(req.params.id);
      res.send({ status: 'ok' });
    });

    // this.httpServer.get('/server-status/', async (_, res) =>{
    //   self.logger.debug('server-status');
    //   const result = await this.projectController.getPage({name: 'arealidea'});
    //   res.send(result);
    // });

    this.httpServer.all('*', function (req, res) {
      self.logger.error('Bad request', req.params);
      res.status(400).send('Bad request');
    });

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
