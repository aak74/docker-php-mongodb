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
    if (params.statusText=='OK') params.statusText='online';
    else params.statusText='offline';
    const status = {
      statusText: params.statusText,
      ping:params.time,
      lastUpdate: date_time
    }
    this.historyModel.Insert(filter,status,params);
    //await this.projectModel.findOneAndUpdate(filter, { status });
    return true;
  }
}

module.exports = HistoryAdd;
