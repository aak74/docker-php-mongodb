const BaseController = require('./BaseController');

class ProjectController extends BaseController {
  constructor(injector) {
    super(injector);
    this.registerCommands([
      'updateProject',
      'createProject',
      'deleteProject',
      'backupProject',
      'updateStatus',
    ]);

    this.registerQueries([
      'getProject',
      'getProjects',
      'getUsers',
    ]);
  }
}

module.exports = ProjectController;
