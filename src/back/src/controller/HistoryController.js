
class HistoryModel {
  constructor({
    history,
  }) {
    this.history = history;
  }

  async getHistory(params) {
    return await this.history.executeGet(params);
  }
  async sendHistory(params) {
    return await this.history.executeSend(params);
  }

}

module.exports = HistoryModel;
