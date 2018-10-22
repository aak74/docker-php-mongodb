'use strict';

//const expressGroup = require('express-group-routes');
const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');

const config = require('../config');
const logger = require('../utils/log');

const Db = require('./Db');
const db = Db.connect();
const projects = require('../models/Projects');
const Queue = require('./Queue');
const StatusUpdater = require('./Status');

const queue = new Queue(logger, 'backup');

/**
 * Точка входа в сервис
 */
class Main {

  constructor () {
    this.logger = logger;
  }

  async run () {

    app.use(bodyParser.json());

    router.use('/status', (req, res, next) => {
      res.status(200).send('OK');
    });

    router.use('/projects', (req, res) => {
      projects.find({}, (err, data) => {
        res.send({
          status: 'ok',
          data
        });
      });
    });

    app.post('/projects', (req, res) => {
      const data = req.body;
      console.log(req);
      projects.create(data);
      res.send('ok');
    });

    app.get('/projects/:id/backup', (req, res) => {
      const data = req.params;
      console.log('backup this -', data);
      queue.connect();
      queue.publish(`_id:${data}`, 'backup');
      res.send('ok');
    });

    app.get('/projects/:id', (req, res) => {
      projects.findOne({ _id: req.params.id }, (err, data) => {
        console.log(data);
        res.send({
          status: 'ok',
          data
        });
      });
    });

    app.delete('/projects/:id', (req, res) => {
      const data = req.params;
      console.log(data);
      projects.deleteOne({ _id: data.id }).exec();
      res.send('deleted');
    });

    app.post('/projects/:id', (req, res) => {
      const data = req.body;
      // console.log(data);
      projects.find({ _id: data.id }).updateOne({ name: data.name, url: data.url }).exec();
      res.send('object saved');
    });

    app.get('/server-status/', (req, res) =>{
      projects.find({}, (err, data) => {
        data.forEach(el => {
          el.updateOne({ status: "300 OK" }).exec();
          console.log(el);
        });
      });
      res.send('kkkk');
    });

    router.all('*', function (req, res) {
      logger.error('Bad request', req.params);
      res.status(400).send('Bad request');
    });

    app.use('/', router);

    app.listen(config.port, (err) => {
      if (err) {
        logger.error(`Server error`, err);
        return;
      }
      logger.info(`Server is listening on ${config.port}`);
    })
  }
}

module.exports = Main;
