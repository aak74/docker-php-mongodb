'use strict';

class UpdateStatus {
  constructor({ logger, projectModel }) {
    this.logger = logger;
    this.projectModel = projectModel;
    // this.addToHistory = addToHistory;
  }

  async execute(params) {
    this.logger.debug('UpdateStatus', params);
    const filter = {
      _id: params._id
    };
    const status = {
      time: params.time,
      status: params.status,
      statusText: params.statusText,
      contentLength: params.contentLength,
    }
    await this.projectModel.findOneAndUpdate(filter, { status });
    return true;
  }
}

module.exports = UpdateStatus;
