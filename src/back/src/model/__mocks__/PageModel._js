'use strict';

// const Model = require('./Model')

// class PageModel extends Model {
class PageModel {
  getObject() {
    return {
      status: 200,
      statusText: 'OK',
      contentLength: 100500,
      time: 123,
      comment: 'mock'
    };
  }
}

module.exports = PageModel;
