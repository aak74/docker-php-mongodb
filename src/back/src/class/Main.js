'use strict';

const express = require('express');
const app = express();
const router = express.Router();

const config = require('../config');
const logger = require('../utils/log');

const Db = require('./Db');
const db = Db.connect();
const projects = require('../models/Projects');

/**
 * Точка входа в сервис
 */
class Main {

  constructor (logger) {
    this.logger = logger;
  }

  async run () {
    
    router.use('/status', (req, res, next) => {
      res.status(200).send('OK');
    });

    router.use('/projects', (req, res) => {
      projects.find({}, (err, items) => {
        res.send(items);
      });
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
