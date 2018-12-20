'use strict';

class UpdateStatus {
  constructor({
    logger,
    projectModel,
  }) {
    this.logger = logger;
    this.projectModel = projectModel;
  }

  execute(params) {
    this.projectModel.update(params);
  }
}

module.exports = UpdateStatus;
