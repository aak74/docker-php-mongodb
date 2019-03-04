'use strict';

class userRegister {
  constructor({
    logger,
    userModel,
    publishMessage,
  }) {
    this.logger = logger;
    this.userModel = userModel;
    this.publishMessage = publishMessage;
  }

  async execute(params) {
    const result = await this.userModel.register(params);
    return result;
  }
}

module.exports = userRegister;