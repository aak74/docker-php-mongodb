'use strict';

class PageModel {
  constructor({
    logger,
    httpClient,
  }) {
    this.logger = logger;
    this.httpClient = httpClient;
  }

  /**
   * Загружает страницу и возвращает информацию о загруженной странице
   * @param {String} url 
   * @todo Сделать фильтр на допустимое доменное имя
   */
  async getObject(url) {
    // console.log('get', url);
    
    const start = Date.now();
    try {
      var result = await this.httpClient.get(this.getUrl(url))
        .then(res => {
          // this.logger.debug(`${url} | ${res.status} | ${Date.now() - start}`);
          return {
            status: res.status,
            statusText: res.statusText,
            contentLength: res.headers['content-length'] || res.data.length,
            time: Date.now() - start,
          };
        // })
        // .catch(err => {
        });
    } catch (err) {
      console.log('catch err', err);
      // this.logger.debug('err', err);
      const time = Date.now() - start;
      const contentLength = 0;
      if (err.errno) {
        return {
          status: err.errno,
          statusText: err.code,
          contentLength,
          time
        };
      }
      return {
        status: err.response.status,
        statusText: err.response.statusText,
        contentLength,
        time
      };
    }
    // console.log('eeeeeeee', result);
    
    return result;
  }

  getUrl(url) {
    if (url && url.substr(0, 4) === 'http') {
      return url;
    }
    return `http://${url}`;
  }
}

module.exports = PageModel;
