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
    result.forEach(element => {
       element.password="";
       element.type='user';
    });
    return result
  }
}

module.exports = users;
