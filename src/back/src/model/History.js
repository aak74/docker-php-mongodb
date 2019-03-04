

class History {
  constructor({ db, collectionName }) {
    this.db = db;
    this.collectionName = collectionName;
  }

  async get(params) {
    console.log(params, 'params');
    const result = await this.db.get()
      .collection(this.collectionName)
      .findOne(params);
    return result;
  }
  async send(filter, update, params) {
    console.log(filter);
    filter={
      ProjectID: filter.ProjectID
      }
    const result = await this.db.get()
      .collection(this.collectionName)
      .findOneAndUpdate(
        filter, {
          $push: {
            history: {
             ...update
            },
          },
        }, 
        params
      )
      .catch(err => {
        console.log(err);
      });
    return result;
  }
}

module.exports = History;

