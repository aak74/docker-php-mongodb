'use strict';

class  ProjectModel {
  constructor({ getPage, getProjects, getProject }) {
    this.getPageQuery = getPage;
    this.getProjectsQuery = getProjects;
    this.getProjectQuery = getProject;
  }

  getPage(params) {
    return this.getProjectsQuery.get(params);
    // return this.getPageQuery.get(params);
  }

  async getProjects() {
    return await this.getProjectsQuery.get();
  }

  async getProject(params) {
    console.log('getProject', params);
    
    return await this.getProjectQuery.get(params);
  }
}

module.exports = ProjectModel;
