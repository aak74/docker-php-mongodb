class UpdateStatus {
  constructor({ logger, projectModel }) {
    this.logger = logger;
    this.projectModel = projectModel;
    // this.addToHistory = addToHistory;
  }

  async execute(params) {
    const dateTime = new Date();
    const filter = {
      _id: params._id,
    };
    if (params.statusText) {
      if (params.statusText === 'OK') {
        params.statusText = 'online';
      } else {
        params.statusText = 'offline';
      }
      const status = {
        status: {
          statusText: params.statusText,
          ping: params.time,
          contentLength: params.contentLength,
          lastUpdate: dateTime,
        },
      };
      this.projectModel.findOneAndInsert(filter, status, params);
      return true;
    }
    const backupTime = {
      backuphistory: {
        backupTime: params.time,
      },
    };
    this.projectModel.findOneAndInsert(filter, backupTime, params);
    return true;
  }
}

module.exports = UpdateStatus;
