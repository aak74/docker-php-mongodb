'use strict';

class  HistoryModel {
  constructor({
  historyAdd,
  historyGet,
  }) {
    this.historyAdd = historyAdd;
    this.historyGet = historyGet;
  }
  async sendHistory(history) {
    return await this.historyAdd.execute(history);
    //console.log('tyt',history);
  }
  async getHistory(history) {
    
    return await this.historyGet.execute(history);
    //
  }

}

module.exports = HistoryModel;
