'use strict';

const { MongoClient, ObjectID } = require('mongodb');
const config = require('../config');

/**
 * Класс работы с БД
 * В случае падения БД делаются попытки переподключения.
 * записи для которых истек таймаут теряются.
 * Факт падения БД можно найти в логе.
 */
class Db {
  constructor ({logger}) {
    this.logger = logger;
    this.db = null;
    this.client = null;
    // this.dbName = config.db.url;
    this.dbName = config.db.name;
  }

  get() {
    return this.db;
  }

  async connect() {
    this.logger.info('Attempt to connect to DB');
    try {
      const options = {
        connectTimeoutMS: config.db.timeout || 1500,
        reconnectInterval: config.db.timeout || 1500,
        reconnectTries: 1,
        useNewUrlParser: true
      };
      this.client = await MongoClient.connect(config.db.url, options);
      this.client.on('close', () => {
        this.logger.error('Connection to MongoDB server was closed');
        this.db = null;
      });
      this.db = this.client.db(this.dbName);
      this.logger.info('Connected successfully to MongoDB server');
      // console.log(this.db);
      return true;
    } catch (err) {
      this.logger.error('DB Database doesn`t connected');
      console.log(err);
    }
    return false;
  }

  async check() {
    if (this.db) {
      return true;
    }
    await this.connect();
    // return false;
  }

  async close() {
    await this.client.close((err) => {
      this.db = null;
      this.logger.info('Connection to MongoDB server was closed');
    });
  }

  async addToCollection(collection, data) {
    const status = await this.check();
    if (!status) {
      return false;
    }
    try {
      this.db.collection(collection).insertOne(
        Object.assign({
          created: Date.now(),
        },
        data,
        ),
      ).then(() => {
        // this.logger.debug('DB adding success');
      }).catch((err) => {
        console.log('DB adding error CATCH 0', err.stack);
      });
    } catch (err) {
      console.log('DB adding error CATCH 1', err.stack);
      this.connect();
      return false;
    }
    return true;
  }

  removeCollection(collection) {
    return this.db.collection(collection).drop();
  }
  
  objectId(str) {
    return new ObjectID(str);
  }
}

module.exports = Db;
