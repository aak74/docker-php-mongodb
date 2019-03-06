'use strict';

class History {
  constructor({ db, collectionName }) {
    this.db = db;
    this.collectionName = collectionName;
  }
}

module.exports = History;
