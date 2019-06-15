

class GetPage {
  constructor({ logger, pageModel }) {
    this.logger = logger;
    this.pageModel = pageModel;
  }

  /**
   * Возвращает информацию о загруженной странице
   * @param {String} url
   */
  get(url) {
    // console.log('GetPage get', url);
    return this.pageModel.getObject(url);
  }
}

module.exports = GetPage;
