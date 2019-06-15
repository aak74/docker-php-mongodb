class RequestQueue {
  constructor({
    projectModel,
  }) {
    this.projectModel = projectModel;
  }

  execute(msg) {
    this.projectModel.requestQueue(msg);
  }
}

module.exports = RequestQueue;
