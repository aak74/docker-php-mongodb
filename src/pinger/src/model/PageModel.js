function getUrl(url) {
  if (url && url.substr(0, 4) === 'http') {
    return url;
  }
  return `http://${url}`;
}

class PageModel {
  constructor({
    logger,
    client,
  }) {
    this.logger = logger;
    this.client = client;
  }

  /**
   * Загружает страницу и возвращает информацию о загруженной странице
   * @param {String} url
   * @todo Сделать фильтр на допустимое доменное имя
   */
  async getObject(url) {
    // this.logger.info('PageModel.getObject', url);

    const start = Date.now();
    try {
      const response = await this.client.get(getUrl(url));
      return {
        status: response.status,
        statusText: response.statusText,
        contentLength: response.headers['content-length'] || response.data.length,
        time: Date.now() - start,
      };
    } catch (err) {
      const time = Date.now() - start;
      const contentLength = 0;
      if (err.errno) {
        return {
          status: err.errno,
          statusText: err.code,
          contentLength,
          time,
        };
      }
      return {
        status: err.response.status,
        statusText: err.response.statusText,
        contentLength,
        time,
      };
    }
  }
}

module.exports = PageModel;
