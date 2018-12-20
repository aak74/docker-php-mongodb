'use strict';

class App {
  constructor({ logger, db, router }) {
    this.logger = logger;
    this.db = db;
    this.router = router;
  }

  run() {
    this.db.connect().then(() => {
      this.logger.info(`Server started`);
      this.router.run();
    })
  }
}

module.exports = App;
