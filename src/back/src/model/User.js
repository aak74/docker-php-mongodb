

class User {
  constructor({ db, collectionName }) {
    this.db = db;
    this.collectionName = collectionName;
  }

  async register(params) {
    const result = await this.db.get()
      .collection(this.collectionName)
      .insertOne(params);
    return result;
  }

  async signIn(params) {
    const result = await this.db.get()
      .collection(this.collectionName)
      .findOne(params);
    return result;
  }

  async getUsers() {
    return this.find().toArray();
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
      blocked:true,
    };
     //console.log('findOneAndUpdate', filter, update);
    const result = await this.db.get()
      .collection(this.collectionName)
      .findOneAndUpdate(
        this.getFilter(id), {
          $set: update
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
    if (filter && filter['_id']) {
      filter['_id'] = this.db.objectId(filter['_id']);
    }
    return filter;
  }
}

module.exports = User;

