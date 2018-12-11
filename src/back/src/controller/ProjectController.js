'use strict';

class  ProjectModel {
  constructor({
    getPage,
    getProjects,
    getProject,
    updateProject,
  }) {
    this.getPageQuery = getPage;
    this.getProjectsQuery = getProjects;
    this.getProjectQuery = getProject;
    this.updateProjectQuery = updateProject;
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

  async updateProject(filter, update) {
    console.log('updateProject', filter, update);
    
    return await this.updateProjectQuery.execute(filter, update);
  }
}

module.exports = ProjectModel;
