'use strict';

class Model {
  constructor({ db, collectionName }) {
    this.db = db;
    this.collectionName = collectionName;
  }

  async find(filter, projection) {
    // console.log('Model find', filter, projection);
    const result = await this.db.get()
      .collection(this.collectionName)
      .find(this.getFilter(filter)).project(projection).toArray();
    return result;
  }

  async findOne(filter, projection) {
    const result = await this.db.get()
      .collection(this.collectionName)
      .findOne(this.getFilter(filter));
      // .project(projection);
    return result;
  }

  async findOneAndUpdate(filter, update, params) {
    // console.log('findOneAndUpdate', filter, update);
    const result = await this.db.get()
      .collection(this.collectionName)
      .findOneAndUpdate(
        this.getFilter(filter), {
          $set: update
        }, 
        params
      )
      .catch(err => {
        console.log(err);
      });
    return result;
  }

  async insertOne(params) {
    const result = await this.db.get()
      .collection(this.collectionName)
      .insertOne(params);
    return result;
  }

  async deleteOne(filter) {
    const result = await this.db.get()
      .collection(this.collectionName)
      .deleteOne(this.getFilter(filter));
    return result;
  }

  getFilter(filter) {
    if (filter && filter['_id']) {
      filter['_id'] = this.db.objectId(filter['_id']);
    }
    return filter;
  }
}

module.exports = Model;
