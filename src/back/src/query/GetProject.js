'use strict';

class GetProject {
  constructor({ logger, projectModel }) {
    this.logger = logger;
    this.projectModel = projectModel;
  }

  async get(params) {
    console.log('GetProject', params);
    const result = await this.projectModel.findOne(params);
    return result;
  }
}

module.exports = GetProject;
