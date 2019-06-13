const BaseController = require('./BaseController');

class UserController extends BaseController {
  constructor(injector) {
    super(injector);
    this.registerCommands([
      'registerUser',
      'deleteUser',
      'blocked',
      'unblocked',
    ]);

    this.registerQueries([
      'checkCredentials',
      'getUsers',
    ]);
  }
}

module.exports = UserController;
