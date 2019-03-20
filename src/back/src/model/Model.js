'use strict';

class Model {
  constructor({ db, collectionName }) {
    this.db = db;
    this.collectionName = collectionName;
  }

  async getList(filter, projection) {
    return this.find(filter, projection).toArray();
  }

  async getObject(filter, projection) {
    return await this.findOne(filter, projection);
  }

  find(filter, projection) {
    //console.log('Model find', filter, projection);
    if (filter)
    {
      filter = {id: filter};
    }
    return this.db.get()
      .collection(this.collectionName)
      .find(this.getFilter(filter)).project(projection);
  }

  async findOne(filter, projection) {
    const result = await this.db.get()
      .collection(this.collectionName)
      .findOne(this.getFilter(filter));
       
      delete result.password;
      //console.log('result=>',result);
    return result;
  }

  async findOneAndUpdate(filter, update, params) {
    filter={
      _id: filter._id,
      password:update.password
      }
     //console.log('findOneAndUpdate', filter, update);
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
  async findOneAndInsert(filter, update, params) {
    filter={
      _id: filter._id,
      }
    const result = await this.db.get()
      .collection(this.collectionName)
      .findOneAndUpdate(
        this.getFilter(filter), {
          $set: update
        }, 
        params
      )
      .catch(err => {
      });
    return result;
  }

  async insertOne(params) {
    const result = await this.db.get()
      .collection(this.collectionName)
      .insertOne(params)
      .catch(err => {
        console.log(err);
      });
    return result;
  }

  async deleteOne(filter) {
    const result = await this.db.get()
      .collection(this.collectionName)
      .deleteOne(this.getFilter(filter))
      .catch(err => {
        console.log(err);
      });
    if (result.result.n===0){return false}
    return true
  }

  getFilter(filter) {
    if (filter && filter['_id']) {
      filter['_id'] = this.db.objectId(filter['_id']);
    }
    return filter;
  }
}

module.exports = Model;
