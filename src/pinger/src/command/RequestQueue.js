'use strict';

class RequestQueue {
  constructor({
    logger,
    projectModel,
  }) {
    this.logger = logger;
    this.projectModel = projectModel;
  }

  execute(msg) {
    this.projectModel.requestQueue(msg);
  }
}

module.exports = RequestQueue;
