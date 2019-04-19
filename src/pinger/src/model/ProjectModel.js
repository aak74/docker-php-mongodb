'use strict';
const security = 'ArealIdea'
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
      console.log('1')
      var result = await this.httpClient.get(`http://backend:3000/historyprojects/${security}`)
        .then(res => {  
          return res.data.data;
        });
    } catch (err) {
      console.log('catch err', err);
    }
    return result;
  }

  async requestQueue(msg) {
    console.log(msg.login);
    try {
      var result = await this.httpClient.post(`http://backend:3000/backup/${msg.id}/Queue/${msg.login}/${msg.name}/${security}`)
        .then(res => {
          return 'success';
        })
        .catch((err) => {
        });
    } catch (err) {
    }
  }

  async update(status) {
    try {
      var result = await this.httpClient.post(`http://backend:3000/projects/${status._id}/status/${security}`, status)
        .then(res => { 
          return res.data.data;
        })
        .catch((err) => {
         console.log('http catch err', err);
        });
    } catch (err) {
     console.log('catch err', err);
    }
    return result;
  }
}

module.exports = ProjectModel;
