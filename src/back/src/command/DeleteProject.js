class DeleteProject {
  constructor({ projectModel }) {
    this.projectModel = projectModel;
  }

  async execute(filter) {
    const result = await this.projectModel.deleteOne(filter);
    return result;
  }
}

module.exports = DeleteProject;
