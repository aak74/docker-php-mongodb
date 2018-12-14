'use strict';

class App {
  constructor({ logger, db, router, getProjects, getPage, updateStatus }) {
    this.logger = logger;
    this.db = db;
    this.router = router;
    this.getProjects = getProjects;
    this.updateStatus = updateStatus;
    this.getPage = getPage;
  }

  run() {
    this.db.connect().then(() => {
      this.logger.info(`Server started`);
      this.router.run();
      this.main();
    })
  }

  async main() {
    const projects = await this.getProjectList();
    projects.forEach(async (elem) => {
      // if (elem.url === 'google.com') {

      // }
      let result = await this.getPage.get(elem.url);
      result = Object.assign(elem, result)
      console.log('gp', result);
      this.updateStatus.execute(result);
    });
    console.log('run', projects);
  }

  async getProjectList() {
    const result = await this.getProjects.get(
      {},
      {
        _id: 1,
        url: 1
      }
    );
    return result;
  }
}

module.exports = App;
