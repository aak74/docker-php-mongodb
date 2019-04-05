'use strict';

class GetHistory {
  constructor({
    logger,
    historyModel,
    publishMessage,
  }) {
    this.logger = logger;
    this.historyModel = historyModel;
    this.publishMessage = publishMessage;
  }

  async get(params) {   
       const result = await this.historyModel.get(params);
       if (result){
        result.history=result.history.slice(result.history.length-21);
        }
       return result;
  }
}

module.exports = GetHistory;
