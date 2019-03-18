'use strict';

class blocked {
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
    const result = await this.userModel.blocked(id);
    return result;
  }
}

module.exports = blocked;
