class GetProjects {
  constructor({ logger, projectModel }) {
    this.logger = logger;
    this.projectModel = projectModel;
  }

  get(filter, projection) {
    return this.projectModel.getList(filter, projection);
  }
}

module.exports = GetProjects;
