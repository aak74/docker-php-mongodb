'use strict';

class unblocked {
  constructor({
    logger,
    userModel,
    publishMessage,
  }) {
    this.logger = logger;
    this.userModel = userModel;
    this.publishMessage = publishMessage;
  }

  async execute(id) {
    const result = await this.userModel.unblocked(id);
    return result;
  }
}

module.exports = unblocked;
