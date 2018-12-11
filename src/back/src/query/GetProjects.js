'use strict';

class GetProjects {
  constructor({ logger, projectModel }) {
    this.logger = logger;
    this.projectModel = projectModel;
  }

  async get() {
    // console.log('this.projectModel', this.projectModel);
    const result = await this.projectModel.find();
    return result;
  }
}

module.exports = GetProjects;
