'use strict';

class BackupProject {
  constructor({ logger, projectModel, queue }) {
    this.logger = logger;
    this.projectModel = projectModel;
    this.queue = queue;
  }

  async execute(FindProject) {
    const RequestData = await this.projectModel.findOne({ '_id': FindProject._id, id:FindProject.id });
    const BackupData = {host:RequestData.host, user:RequestData.user, port:RequestData.port, passwordSSH:RequestData.passwordSSH, path:RequestData.path};
    //TODO: Передавать только необходимые для бэкапа данные
    this.queue.publish(BackupData, 'backup');
    return true;
  }
}

module.exports = BackupProject;
