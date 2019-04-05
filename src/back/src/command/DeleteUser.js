'use strict';

class DeleteUser {
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
    const result = await this.userModel.delete(id);
    return result;
  }
}

module.exports = DeleteUser;
