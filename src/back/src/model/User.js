

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

  auth(params) {
    const result = this.db.get()
      .collection('users')
      .findOne(params);
    return result;
  }
}

module.exports = User;

