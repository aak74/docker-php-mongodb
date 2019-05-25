class HistoryController {
  constructor({
    addToHistory,
    getHistory,
  }) {
    this.AddToHistory = addToHistory;
    this.GetHistory = getHistory;
  }

  addToHistory(history) {
    return this.AddToHistory.execute(history);
  }

  getHistory(projectId) {
    return this.GetHistory.get(projectId);
  }
}

module.exports = HistoryController;
