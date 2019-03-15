'use strict';

class DeleteProject {
  constructor({ 
    logger, 
    projectModel,
    publishMessage,
  }) {
    this.logger = logger;
    this.projectModel = projectModel;
    this.publishMessage = publishMessage;
  }

  async execute(filter) {
    const result = await this.projectModel.deleteOne(filter);
    return result;
  }
}

module.exports = DeleteProject;
