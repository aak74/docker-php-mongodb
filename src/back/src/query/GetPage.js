'use strict';

class GetPage {
  constructor({ logger, httpClient }) {
    this.logger = logger;
    this.httpClient = httpClient;
  }

  async get(url) {
    console.log(url);
    
    const start = Date.now();
    const result = await this.httpClient.get(url)
      .then(res => {
        this.logger.debug('res', url, res.headers['content-length'], Date.now() - start);
        return 
      })
      .catch(err => {
        console.log('err', err);
        this.logger.debug('err', err);
      });
  }
}

module.exports = GetPage;
