'use strict';

const Model = require('./Model')

class ProjectModel extends Model {
  constructor({ logger }) {
    super({ logger })
  }

  async getList() {
    return [{
      _id: 0,
      name: 'google',
      url: 'google.com'
    }, {
      _id: 1,
      name: 'ya',
      url: 'ya.ru'
    }, {
      _id: 2,
      name: 'unknowndomain',
      url: 'nonexistentnonexistentnonexistentnonexistentdomain.xyz'
    }];
  }
}

module.exports = ProjectModel;
