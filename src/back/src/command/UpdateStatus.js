'use strict';

class UpdateStatus {
  constructor({ logger, projectModel }) {
    this.logger = logger;
    this.projectModel = projectModel;
    // this.addToHistory = addToHistory;
  }

  async execute(params) {   
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
    this.projectModel.findOneAndInsert(filter,status,params);
    //this.logger.debug('UpdateStatus',filter);
    //await this.projectModel.findOneAndUpdate(filter, { status });
    return true;
  }
}

module.exports = UpdateStatus;
