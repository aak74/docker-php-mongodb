class Model {
  constructor({ db, collectionName }) {
    this.db = db;
    this.collectionName = collectionName;
  }

  async getList(filter, projection) {
    return this.find(filter, projection).toArray();
  }

  getObject(filter, projection) {
    return this.findOne(filter, projection);
  }

  find(filter, projection) {
    return this.db.get()
      .collection(this.collectionName)
      .find(this.getFilter(filter)).project(projection);
  }

  findById(filter, projection) {
    return this.find({ _id: filter }, projection);
  }

  async findOne(filter) {
    const result = await this.db.get()
      .collection(this.collectionName)
      .findOne(this.getFilter(filter));
    return result;
  }

  async findOneAndUpdate(filter, update, params) {
    console.log('findOneAndUpdate', filter, update, params);

    delete (update._id);
    const result = await this.db.get()
      .collection(this.collectionName)
      .findOneAndUpdate(
        this.getFilter(filter), {
          $set: update,
        },
        params,
      )
      .catch(err => {
        console.log(err);
      });
    return result;
  }

  async findOneAndInsert(filter, update, params) {
    const result = await this.db.get()
      .collection(this.collectionName)
      .findOneAndUpdate(
        this.getFilter(filter), {
          $set: update,
        },
        params,
      )
      .catch(err => {
        console.log('findOneAndInsert error', err);
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
    if (result.result.n === 0) { return false; }
    return true;
  }

  getFilter(filter) {
    if (filter && filter._id) {
      filter._id = this.db.objectId(filter._id);
    }
    return filter;
  }
}

module.exports = Model;
