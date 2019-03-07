'use strict';

class HistoryGet {
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
       console.log('GetProject', params);
       const result = await this.historyModel.get(params);
       result.history=result.history.slice(result.history.length-21);
       return result;
  }
}

module.exports = HistoryGet;
