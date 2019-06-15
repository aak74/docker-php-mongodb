class ProjectModel {
  constructor({
    logger,
    client,
    token,
  }) {
    this.logger = logger;
    this.client = client;
    this.token = token;
  }

  async getList() {
    try {
      console.log('1');
      const { data } = await this.client.get({
        url: 'http://backend:3000/services/projects',
        // Authorization: 1,
        Authorization: this.token,
      });
      return data.data;
    } catch (err) {
      console.log('catch err', err);
      throw err;
    }
  }

  async update(project) {
    try {
      const { data } = await this.client.post({
        url: `http://backend:3000/projects/pinger/${project._id}`,
        data: project,
        Authorization: this.token,
      });
      return data.data;
    } catch (err) {
      console.log('catch err', err);
      throw err;
    }
  }
}

module.exports = ProjectModel;
