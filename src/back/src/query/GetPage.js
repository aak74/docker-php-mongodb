'use strict';

class GetPage {
  constructor({ logger, httpClient }) {
    this.logger = logger;
    this.httpClient = httpClient;
  }

  /**
   * Загружает страницу и возвращает информацию о загруженной странице
   * @param {String} url 
   * @todo Сделать фильтр на допустимое доменное имя
   */
  async get(url) {
    console.log(url);
    
    const start = Date.now();
    const result = await this.httpClient.get(this.getUrl(url))
      .then(res => {
        // console.log('GetPage res', res);
        return {
          status: res.status,
          statusText: res.statusText,
          contentLength: res.headers['content-length'] || res.data.length,
          time: Date.now() - start,
        };
      })
      .catch(err => {
        console.log('err', err);
        this.logger.debug('err', err);
      });
    console.log('GetPage result', result);
    return result;
    
  }

  getUrl(url) {
    if (url && url.substr(0, 4) === 'http') {
      return url;
    }
    return `http://${url}`;
  }
}

module.exports = GetPage;
