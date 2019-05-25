const BaseController = require('./BaseController');

class UserController extends BaseController {
  constructor({
    registerUser,
    getUsers,
    deleteUser,
    blocked,
    unblocked,
    checkCredentials,
  }) {
    super();
    this.registerCommands({
      registerUser,
      getUsers,
      deleteUser,
      blocked,
      unblocked,
    });

    this.registerQueries({
      checkCredentials,
    });
  }

  usersGet(params) {
    return this.get('getUsers', params);
  }

  delete(id) {
    return this.execute('delete', id);
  }

  block(id) {
    return this.execute('blocked', id);
  }

  unblock(id) {
    return this.execute('unblocked', id);
  }

  checkCredentials(params) {
    return this.get('checkCredentials', params);
  }

  register(params) {
    return this.execute('registerUser', params);
  }
}

module.exports = UserController;
