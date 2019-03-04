'use strict';

class BackupProject {
  constructor({ logger, projectModel, queue }) {
    this.logger = logger;
    this.projectModel = projectModel;
    this.queue = queue;
  }

  async execute(id) {
    //console.log('BackupProject', id);
    const data = await this.projectModel.findOne({ '_id': id });
    // console.log('BackupProject data', data);
    //TODO: Передавать только необходимые для бэкапа данные
    this.queue.publish(data, 'backup');
    return true;
  }
}

module.exports = BackupProject;
