class RegisterUser {
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
    const result = await this.userModel.findOne(params);
    if (!result) {
      try {
        await this.userModel.insertOne(params);
      } catch (err) {
        this.logger.error('Register error', err);
        return false;
      }
      return true;
    }
    return false;
  }
}

module.exports = RegisterUser;
