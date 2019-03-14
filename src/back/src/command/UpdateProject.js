'use strict';

class UpdateProject {
  constructor({
    logger,
    projectModel,
    publishMessage,
  }) {
    this.logger = logger;
    this.projectModel = projectModel;
    this.publishMessage = publishMessage;
  }

  async execute(filter, update) {
    const id = update.id;
    delete(update.id);
    await this.projectModel.findOneAndUpdate(filter, update);
    update._id = id;
    this.publishMessage.execute({ queue: 'projectUpdated', msg: update });
    return true;
  }
}

module.exports = UpdateProject;
