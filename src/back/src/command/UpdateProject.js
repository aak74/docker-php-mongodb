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
    await this.projectModel.findOneAndUpdate(filter, update);
    this.publishMessage.execute({ queue: 'projectUpdated', msg: update });
    return true;
  }
}

module.exports = UpdateProject;
