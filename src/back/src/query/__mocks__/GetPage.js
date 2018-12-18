'use strict';

class GetProjects {
  get() {
    return {
      status: 200,
      statusText: 'OK',
      contentLength: 100500,
      time: 123,
      comment: 'mock'
    };
  }
}

module.exports = GetProjects;
