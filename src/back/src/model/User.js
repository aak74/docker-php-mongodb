

class User {
  constructor({ db, collectionName }) {
    this.db = db;
    this.collectionName = collectionName;
  }

  async register(params) {
    console.log(params, 'params');
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
    console.log(result);
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
}

module.exports = User;

