'use strict';

class GetUsers {
  constructor({
    logger,
    userModel,
    publishMessage,
  }) {
    this.logger = logger;
    this.userModel = userModel;
    this.publishMessage = publishMessage;
  }

  async get(params) {
    const result = await this.userModel.getList(params);
    result.forEach(element => {
       element.password="";
       element.type='user';
    });
    return result
  }
}

module.exports = GetUsers;
