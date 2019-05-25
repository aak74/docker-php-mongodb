/* eslint-disable no-underscore-dangle */
const Model = require('./Model');

class UserModel extends Model {
  constructor({ db }) {
    super({ db, collectionName: 'users' });
  }

  async delete(id) {
    const result = await this.db.get()
      .collection(this.collectionName)
      .deleteOne(this.getFilter(id))
      .catch(err => {
        console.log(err);
      });
    return result;
  }

  async blocked(id) {
    const update = {
      blocked: true,
    };
    // console.log('findOneAndUpdate', filter, update);
    const result = await this.db.get()
      .collection(this.collectionName)
      .findOneAndUpdate(
        this.getFilter(id), {
          $set: update,
        },
      )
      .catch(err => {
        console.log(err);
      });
    return result;
  }

  async unblocked(id) {
    const update = {
      blocked: false,
    };
    // console.log('findOneAndUpdate', filter, update);
    const result = await this.db.get()
      .collection(this.collectionName)
      .findOneAndUpdate(
        this.getFilter(id), {
          $set: update,
        },
      )
      .catch(err => {
        console.log(err);
      });
    return result;
  }

  find() {
    // console.log('Model find', filter, projection);
    return this.db.get()
      .collection(this.collectionName)
      .find().project();
  }

  auth(params) {
    const result = this.db.get()
      .collection('users')
      .findOne(params);

    return result;
  }

  getFilter(filter) {
    if (filter && filter._id) {
      filter._id = this.db.objectId(filter._id);
    }
    return filter;
  }
}

module.exports = UserModel;
