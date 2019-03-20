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
    const resultsignIn = await this.userModel.signIn(params);
    if(!resultsignIn){
      params.blocked = false;
      const result = await this.userModel.register(params);
      return { login:'registered'}
    }
    return {login:'failed'}
  }
}

module.exports = userRegister;
