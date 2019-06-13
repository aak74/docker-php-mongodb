class BackupProject {
  constructor({ projectModel, queue }) {
    this.projectModel = projectModel;
    this.queue = queue;
  }

  async execute(params) {
    const project = await this.projectModel.findOne(params);
    if (!project) {
      throw new Error('Backup error. Project not found.');
    }
    try {
      console.log('backup', project);

      this.queue.publish(
        {
          id: params._id,
          name: project.name,
          ssh: project.ssh,
        },
        'backup',
      );
    } catch (error) {
      throw new Error('Backup error');
    }
    return true;
  }
}

module.exports = BackupProject;
