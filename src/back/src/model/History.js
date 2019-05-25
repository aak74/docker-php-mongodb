class History {
  constructor({ db, collectionName }) {
    this.db = db;
    this.collectionName = collectionName;
  }

  async Insert(filter, update, params) {
    const realFilter = {
      id: filter.id,
    };
    const result = await this.db.get()
      .collection(this.collectionName)
      .findOneAndUpdate(
        realFilter, {
          $push: {
            history: {
              ...update,
            },
          },
        },
        params,
      )
      .catch(err => {
        console.log(err);
      });
    if (result.value == null) {
      const resultInsert = await this.db.get()
        .collection(this.collectionName)
        .insertOne(filter)
        .catch(err => {
          console.log(err);
        });
      return resultInsert;
    }
    return result;
  }

  async InsertBackup(filter, update, params) {
    console.log(111);
    const realFilter = {
      id: filter.id,
    };
    const result = await this.db.get()
      .collection(this.collectionName)
      .findOneAndUpdate(
        realFilter, {
          $push: {
            historyBackup: {
              ...update,
            },
          },
        },
        params,
      )
      .catch(err => {
        console.log(err);
      });
    if (result.value == null) {
      const resultInsert = await this.db.get()
        .collection(this.collectionName)
        .insertOne(filter)
        .catch(err => {
          console.log(err);
        });
      return resultInsert;
    }
    return result;
  }

  async get(filter) {
    const result = await this.db.get()
      .collection(this.collectionName)
      .findOne(filter);
      // console.log('result=>',result);
    return result;
  }
}

module.exports = History;
