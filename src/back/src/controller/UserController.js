'use strict';

class UserModel {
  constructor({
    userAuth,
    userRegister,
    users,
  }) {
    this.userAuth = userAuth;
    this.userRegister = userRegister;
    this.users = users;
  }

  async usersGet(params) {
    return await this.users.execute(params);
  }

  async login(params) {
    return await this.userAuth.execute(params);
  }

  async register(params) {
    return await this.userRegister.execute(params);
  }
}

module.exports = UserModel;
