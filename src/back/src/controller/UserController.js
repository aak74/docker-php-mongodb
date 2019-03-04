

class UserModel {
  constructor({
    userAuth,
    userRegister,
  }) {
    this.userAuth = userAuth;
    this.userRegister = userRegister;
  }

  async login(params) {
    return await this.userAuth.execute(params);
  }

  async register(params) {
    return await this.userRegister.execute(params);
  }

}

module.exports = UserModel;
