'use strict';

const User = require('./User')

class UserModel extends User {
  constructor({ db }) {
    super({ db, collectionName: 'users' })
  }
}

module.exports = UserModel;