'use strict';

class CreateProject {
  constructor({
    logger,
    projectModel,
    updateStatuses,
  }) {
    this.logger = logger;
    this.projectModel = projectModel;
    this.updateStatuses = updateStatuses;
  }

  async execute(params) {
    this.logger.debug('CreateProject', params);
    const result = await this.projectModel.insertOne(params);
    this.logger.debug('CreateProject 2', result);
    this.updateStatuses.putProjectToQueue(params);
    return true;
  }
}

module.exports = CreateProject;
