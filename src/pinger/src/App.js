class App {
  constructor({
    logger,
    queue,
    updateStatuses,
  }) {
    this.logger = logger;
    this.queue = queue;
    this.updateStatuses = updateStatuses;
  }

  run() {
    this.updateStatuses.execute();
    this.subscribe();
  }

  subscribe() {
    this.queue.connect();
    this.queue.subscribe('projectCreated');
    this.queue.subscribe('projectDeleted');
    this.queue.subscribe('projectUpdated');
    this.queue.subscribe('backup');
    this.queue.on('projectCreated', msg => {
      this.logger.debug('projectCreated', msg);
      this.update(msg);
    });
    this.queue.on('projectDeleted', msg => {
      this.logger.debug('projectDeleted', msg);
      // projectCreated(msg);
    });
    this.queue.on('projectUpdated', msg => {
      this.logger.debug('projectUpdated', msg);
      this.update(msg);
    });
  }

  update(params) {
    // params._id = id;
    this.updateStatuses.putProjectToQueue(params);
  }
}

module.exports = App;
