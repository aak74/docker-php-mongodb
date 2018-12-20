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
    console.log('DeleteProject', filter);
    await this.projectModel.deleteOne(filter);
    this.publishMessage.execute({ queue: 'projectDeleted', msg: filter });
    return true;
  }
}

module.exports = DeleteProject;
