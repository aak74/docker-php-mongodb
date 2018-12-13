'use strict';

class DeleteProject {
  constructor({ logger, projectModel }) {
    this.logger = logger;
    this.projectModel = projectModel;
  }

  async execute(filter) {
    console.log('DeleteProject', filter);
    await this.projectModel.deleteOne(filter);
    return true;
  }
}

module.exports = DeleteProject;
