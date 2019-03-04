
'use strict';

class history {
  constructor({ logger, historyModel }) {
    this.logger = logger;
    this.historyModel = historyModel
  }
  async executeGet(params) {
    const result = await this.historyModel.get(params);
    return result;
  }
  async executeSend(params) {
    this.logger.debug('UpdateStatus', params);

    let date_time =new Date();
    const filter = {
      ProjectID: params._id,
    };
    if (params.statusText=='OK') params.statusText='online';
    else params.statusText='offline';
    const status = {
      statusText: params.statusText,
      ping:params.time,
      lastUpdate: date_time
    }
    this.historyModel.send(filter,status,params);
    //this.logger.debug('UpdateStatus',filter);
    //await this.projectModel.findOneAndUpdate(filter, { status });
    return true;
  }
}

module.exports = history;
