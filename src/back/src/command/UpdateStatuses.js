'use strict';

class UpdateStatues {
  constructor({
    logger,
    getProjects,
    getPage,
    updateStatus
  }) {
    this.logger = logger;
    this.getProjects = getProjects;
    this.updateStatus = updateStatus;
    this.getPage = getPage;
  }

  async execute() {
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
    const result = await this.getProjects.get({}, {
      _id: 1,
      url: 1
    });
    return result;
  }
}

module.exports = UpdateStatues;
