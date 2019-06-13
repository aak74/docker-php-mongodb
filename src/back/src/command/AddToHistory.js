class AddToHistory {
  constructor({ historyModel }) {
    this.historyModel = historyModel;
  }

  async execute(params) {
    const dateTime = new Date();
    const filter = {
      id: params._id,
    };
    if (params.statusText) {
      const status = {
        statusText: params.statusText,
        ping: params.time,
        contentLength: params.contentLength,
        lastUpdate: dateTime,
      };
      this.historyModel.Insert(filter, status, params);
      return true;
    }
    const backupTime = {
      backupTime: params.time,
    };
    this.historyModel.InsertBackup(filter, backupTime, params);
    return true;
  }
}

module.exports = AddToHistory;
