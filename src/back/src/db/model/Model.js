'use strict';

class Model {
  constructor({ db, collectionName }) {
    this.db = db;
    this.collectionName = collectionName;
  }

  async find(params) {
    // console.log({params});
    
    const result = await this.db.get().collection(this.collectionName).find(params).toArray();
    return result;
  }

  async findOne(params) {
    console.log({params});
    if (params && params['_id']) {
      params['_id'] = this.db.objectId(params['_id']);
    }
    
    const result = await this.db.get().collection(this.collectionName).findOne(params);
    return result;
  }
}

module.exports = Model;
