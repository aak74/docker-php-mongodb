'use strict';

class Model {
  constructor({ logger }) {
    this.logger = logger;
  }
  getList() {
    return [];
  }

  getObject() {
    return this.getList()[0];
  }
  find() {
    return {};
  }

  findOne() {
    return {};
  }

  findOneAndUpdate() {
   //this.logger.debug('findOneAndUpdate mock', arguments);
    return true;
  }

  insertOne() {
    return true;
  }

  deleteOne() {
    return true;
  }
}

module.exports = Model;
