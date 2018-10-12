'use strict';

const express = require('express');
const app = express();
const logger = require('../utils/log');
const router = express.Router();
const port = 3000;

/**
 * Точка входа в сервис
 */
class Main {

  async run () {
    
    router.use('/status', (req, res, next) => {
      res.status(200).send('OK');
    });

    router.use('/files/:filename', (request, response) => {
      const filename = request.params && request.params.filename;
      if (filename) {
        const file = `/files/${filename}`;
        return response.sendFile(file, {}, (err) => {
          if (err) {
            response.status(404).send('File not found!');
          }
        });
      }
      return response.status(404).send('File not found!');
    });
    
    router.use('/files/:folder/:filename', (request, response) => {
      const folder = request.params && request.params.folder;
      const filename = request.params && request.params.filename;
      if (folder && filename) {
        const file = `/files/${folder}/${filename}`;
        return response.sendFile(file, {}, (err) => {
          if (err) {
            response.status(404).send('File not found!');
          }
        });
      }
      return response.status(404).send('File not found!');
    });

    router.use('/files/:folder/errors/:folderTwo/:folderThree/:filename', (request, response) => {
      const folder = request.params && request.params.folder;
      const folderTwo = request.params && request.params.folderTwo;
      const folderThree = request.params && request.params.folderThree;
      const filename = request.params && request.params.filename;
      if (folder && folderTwo && folderThree && filename) {
        const file = `/files/${folder}/errors/${folderTwo}/${folderThree}/${filename}`;
        return response.sendFile(file, {}, (err) => {
          if (err) {
            response.status(404).send('File not found!');
          }
        });
      }
      return response.status(404).send('File not found!');
    });


    router.all('*', function (req, res) {
      logger.error('Bad request', req.params);
      res.status(400).send('Bad request');
    });

    app.use('/', router);

    app.listen(port, (err) => {
      if (err) {
        logger.error(`Server error`, err);
        return;
      }
      logger.info(`Server is listening on ${port}`);
    })
  }
}

module.exports = Main;
