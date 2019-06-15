class UpdateStatus {
  constructor({
    projectModel,
  }) {
    this.projectModel = projectModel;
  }

  execute(params) {
    this.projectModel.update(params);
  }
}

module.exports = UpdateStatus;
