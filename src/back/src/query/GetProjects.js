'use strict';

class GetProjects {
  constructor({ logger, projectModel }) {
    this.logger = logger;
    this.projectModel = projectModel;
  }

  async get(filter, projection) {
    // console.log('get', filter, projection);
    const result = await this.projectModel.getList(filter, projection);
    return result;
  }
}

module.exports = GetProjects;
