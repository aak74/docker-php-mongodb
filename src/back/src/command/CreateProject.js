'use strict';

class CreateProject {
  constructor({ logger, projectModel }) {
    this.logger = logger;
    this.projectModel = projectModel;
  }

  async execute(params) {
    console.log('CreateProject', params);
    await this.projectModel.insertOne(params);
    return true;
  }
}

module.exports = CreateProject;
