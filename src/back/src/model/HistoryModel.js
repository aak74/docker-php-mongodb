'use strict';

const History = require('./History')

class HistoryModel extends History {
  constructor({ db }) {
    super({ db, collectionName: 'history' })
  }
}

module.exports = HistoryModel;
