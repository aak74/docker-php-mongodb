'use strict';

class GetProjects {
  constructor({ logger, projectModel }) {
    this.logger = logger;
    this.projectModel = projectModel;
  }

  async get(filter, projection) {
    const result = await this.projectModel.getList(filter, projection);
    for (var key in result) {
      result[key].password='******';
      }
    return result;
  }
}

module.exports = GetProjects;
