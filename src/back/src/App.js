class App {
  constructor({ logger, db, rootRouter }) {
    this.logger = logger;
    this.db = db;
    this.router = rootRouter;
  }

  run() {
    this.db.connect().then(() => {
      this.logger.info('Server started');
      this.router.run();
    });
  }
}

module.exports = App;
