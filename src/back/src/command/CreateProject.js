'use strict';

class CreateProject {
  constructor({
    logger,
    projectModel,
    publishMessage,
  }) {
    this.logger = logger;
    this.projectModel = projectModel;
    this.publishMessage = publishMessage;
  }

  async execute(params) {
    this.logger.debug('CreateProject', params);
    const result = await this.projectModel.insertOne(params);
    this.logger.debug('CreateProject 2', params);
    this.publishMessage.execute({ queue: 'projectCreated', msg: params });
    return true;
  }
}

module.exports = CreateProject;
