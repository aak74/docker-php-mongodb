'use strict';

class UserModel {
  constructor({
    userAuth,
    userRegister,
    users,
    deleteUser
  }) {
    this.userAuth = userAuth;
    this.userRegister = userRegister;
    this.users = users;
    this.deleteUser = deleteUser;
  }

  async usersGet(params) {
    return await this.users.execute(params);
  }

  async delete(id) {
    return await this.deleteUser.execute(id);
  }

  async login(params) {
    return await this.userAuth.execute(params);
  }

  async register(params) {
    return await this.userRegister.execute(params);
  }
}

module.exports = UserModel;
