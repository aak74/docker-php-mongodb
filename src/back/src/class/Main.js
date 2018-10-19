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

    app.post('/projects/backup', (req, res) => {
      console.log('backup req');
      res.send('backup saved');
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
