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
    this.logger.debug('UpdateStatus', params);

    let date_time =new Date();
    const filter = {
      _id: params._id,
    };
    if (params.statusText=='OK') params.statusText='online';
    else params.statusText='offline';
    const status = {
      statusText: params.statusText,
      ping:params.time,
      lastUpdate: date_time
    }
   // this.historyModel.findOneAndInsert(filter,status,params);
    //this.logger.debug('UpdateStatus',filter);
    //await this.projectModel.findOneAndUpdate(filter, { status });
    return true;
  }
}

module.exports = HistoryAdd;
