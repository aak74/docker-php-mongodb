'use strict';

class UpdateProject {
  constructor({ logger, projectModel }) {
    this.logger = logger;
    this.projectModel = projectModel;
  }

  async execute(filter, update) {
    console.log('UpdateProject', filter, update);
    await this.projectModel.findOneAndUpdate(filter, update);
    return true;
  }
}

module.exports = UpdateProject;
