'use strict';

class users {
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
    const result = await this.userModel.getUsers(params);
    return result
  }
}

module.exports = users;
