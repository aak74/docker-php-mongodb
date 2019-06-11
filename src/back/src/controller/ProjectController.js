class ProjectController {
  constructor({
    getProjects,
    getProject,
    updateProject,
    createProject,
    deleteProject,
    backupProject,
    updateStatus,
  }) {
    this.getProjects = getProjects;
    this.getProject = getProject;
    this.updateProject = updateProject;
    this.createProject = createProject;
    this.deleteProject = deleteProject;
    this.backupProject = backupProject;
    this.updateStatusCommand = updateStatus;
  }

  getList(filter) {
    return this.getProjects.get(filter);
  }

  get(params) {
    return this.getProject.get(params);
  }

  update(filter, update) {
    return this.updateProject.execute(filter, update);
  }

  create(params) {
    return this.createProject.execute(params);
  }

  delete(params) {
    return this.deleteProject.execute(params);
  }

  backup(params) {
    return this.backupProject.execute(params);
  }

  updateStatus(params) {
    return this.updateStatusCommand.execute(params);
  }
}

module.exports = ProjectController;
