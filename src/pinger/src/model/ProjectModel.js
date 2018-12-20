'use strict';

class ProjectModel {
  constructor({
    logger,
    httpClient,
  }) {
    this.logger = logger;
    this.httpClient = httpClient;
  }

  async getList() {
    try {
      var result = await this.httpClient.get(`http://back:3000/projects`)
        .then(res => {
          console.log('getList', res.data.data);
          
          return res.data.data;
        });
    } catch (err) {
      console.log('catch err', err);
    }
    return result;
  }

  async update(status) {
    console.log(status);
    
    // return;
    try {
      var result = await this.httpClient.post(`http://back:3000/projects/${status._id}/status`, status)
        .then(res => {
          console.log('getList', res.data.data);
          
          return res.data.data;
        });
    } catch (err) {
      console.log('catch err', err);
    }
    return result;
  }
}

module.exports = ProjectModel;
