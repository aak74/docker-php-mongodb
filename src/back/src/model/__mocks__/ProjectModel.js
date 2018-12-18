'use strict';

const Model = require('./Model')

class ProjectModel extends Model {
  constructor({ logger }) {
    super({ logger })
  }

  async getList(filter, projection) {
    return [{
      _id: 0,
      name: 'google',
      url: 'google.com'
    }, {
      _id: 1,
      name: 'ya',
      url: 'ya.ru'
    }];;
  }
}

module.exports = ProjectModel;
