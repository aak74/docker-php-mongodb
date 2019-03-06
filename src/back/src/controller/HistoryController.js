'use strict';

class  HistoryModel {
  constructor({
  historyAdd,
  }) {
    this.historyAdd = historyAdd;
  }
  async sendHistory(history) {
    return await this.historyAdd.execute(history);
    //console.log('tyt',history);
  }

}

module.exports = HistoryModel;
