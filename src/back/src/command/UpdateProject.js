'use strict';

class UpdateProject {
  constructor({
    logger,
    projectModel,
    updateStatuses,
  }) {
    this.logger = logger;
    this.projectModel = projectModel;
    this.updateStatuses = updateStatuses;
  }

  async execute(filter, update) {
    // console.log('UpdateProject', filter, update);
    // await this.projectModel.findOneAndUpdate(filter, update);
    update._id = update.id;
    this.updateStatuses.putProjectToQueue(update);
    return true;
  }
}

module.exports = UpdateProject;
