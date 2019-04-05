'use strict';

class  HistoryController {
  constructor({
    addToHistory,
    getHistory,
  }) {
    this.AddToHistory = addToHistory;
    this.GetHistory = getHistory;
  }
  async addToHistory(history) {
    return await this.AddToHistory.execute(history);
  }

  async getHistory(projectId) {
    return await this.GetHistory.get(projectId);
    //
  }

}

module.exports = HistoryController;
