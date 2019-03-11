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
    const status = {status:{
      statusText: params.statusText,
      ping:params.time,
      contentLength:params.contentLength,
      lastUpdate: date_time
    }};
    this.projectModel.findOneAndInsert(filter,status,params);
    return true;
  }
}

module.exports = UpdateStatus;
