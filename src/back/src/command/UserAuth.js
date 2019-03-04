'use strict';

class userAuth {
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
    const result = await this.userModel.signIn(params);
    return result;
  }
}

module.exports = userAuth;
