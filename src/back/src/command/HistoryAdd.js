'use strict';

class HistoryAdd {
  constructor({
    logger,
    historyModel,
    publishMessage,
  }) {
    this.logger = logger;
    this.historyModel = historyModel;
    this.publishMessage = publishMessage;
  }

  async execute(params) {   
    let date_time =new Date();
    const filter = {
      id: params._id,
    };
    if (params.statusText){
      const status = {
          statusText: params.statusText,
          ping:params.time,
          contentLength:params.contentLength,
          lastUpdate: date_time,
      };
      this.historyModel.Insert(filter,status,params);
      return true;
    };
    const backupTime = {
        backupTime: params.time,
    };
    this.historyModel.InsertBackup(filter,backupTime,params);
    return true;
  }
}

module.exports = HistoryAdd;
