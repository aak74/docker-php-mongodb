'use strict';

const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');

const config = require('../config');
const logger = require('../utils/log');

const Db = require('./Db');
const db = Db.connect();
const projects = require('../models/Projects');

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
      projects.create(req.body);
      // projects.findByIdAndRemove(req);
      res.send('object created');
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
