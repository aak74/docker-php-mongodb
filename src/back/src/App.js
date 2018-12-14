'use strict';

class App {
  constructor({ logger, db, router, updateStatuses }) {
    this.logger = logger;
    this.db = db;
    this.router = router;
    this.updateStatuses = updateStatuses;
  }

  run() {
    this.db.connect().then(() => {
      this.logger.info(`Server started`);
      this.router.run();
      this.updateStatuses.execute();
    })
  }
}

module.exports = App;
