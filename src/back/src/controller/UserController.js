'use strict';

const BaseController = require('./BaseController');

class UserController extends BaseController {
  constructor({
    registerUser,
    getUsers,
    deleteUser,
    blocked,
    unblocked,
    checkCredentials
  }) {
    // this.authUser = authUser;
    console.log('UserController', arguments[0]);
    super();
    this.registerCommands({
      registerUser,
      getUsers,
      deleteUser,
      blocked,
      unblocked,
    });
 
    this.registerQueries({
      checkCredentials
    });
  }

  async usersGet(params) {
    return await this.get('getUsers', params);
  }

  async delete(id) {
    return await this.execute('delete', id);
  }

  async block(id) {
    return await this.execute('blocked', id);
  }

  async unblock(id) {
    return await this.execute('unblocked', id);
  }

  async checkCredentials(params) {
    return await this.get('checkCredentials', params);
  }

  async register(params) {
    return await this.execute('registerUser', params);
  }
}

module.exports = UserController;
