'use strict';

class UserModel {
  constructor({
    userAuth,
    userRegister,
    users,
    deleteUser,
    blocked,
    unblocked,
  }) {
    this.userAuth = userAuth;
    this.userRegister = userRegister;
    this.users = users;
    this.deleteUser = deleteUser;
    this.blocked = blocked;
    this.unblocked = unblocked;
  }

  async usersGet(params) {
    return await this.users.execute(params);
  }

  async delete(id) {
    return await this.deleteUser.execute(id);
  }

  async block(id) {
    return await this.blocked.execute(id);
  }

  async unblock(id) {
    return await this.unblocked.execute(id);
  }

  async login(params) {
    return await this.userAuth.execute(params);
  }

  async register(params) {
    return await this.userRegister.execute(params);
  }
}

module.exports = UserModel;
