'use strict';

class GetProject {
  constructor({ logger, projectModel }) {
    this.logger = logger;
    this.projectModel = projectModel;
  }

  async get(params) {
    const result = await this.projectModel.getObject(params);
    return result;
  }
}

module.exports = GetProject;
