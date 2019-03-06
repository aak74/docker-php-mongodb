'use strict';

class History {
  constructor({ db, collectionName }) {
    this.db = db;
    this.collectionName = collectionName;
  }

  async Insert(filter, update, params) {
    filter={
      id: filter.id
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
      if(result.value == null){
        console.log(result,'result');
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
}

module.exports = History;
