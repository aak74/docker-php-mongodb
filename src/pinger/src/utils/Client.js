function stringify(data) {
  return Object.keys(data).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`).join('&');
}

class Client {
  constructor({ logger, config, httpClient }) {
    this.logger = logger;
    this.backendUrl = config.backendUrl;
    this.httpClient = httpClient;
  }

  request(params) {
    this.logger.debug('Client.request', params);
    // return;

    if (params.Authorization) {
      // eslint-disable-next-line no-param-reassign
      params = Object.assign(params, { headers: { Authorization: params.Authorization } });
      delete params.Authorization;
    }
    try {
      return this.httpClient.request(params);
    } catch (err) {
      console.log('request error', err);

      throw err;
    }
  }

  get(params) {
    return this.request(Object.assign(params, { method: 'get' }));
  }

  post(params) {
    return this.request(Object.assign(params, { method: 'post' }));
  }

  postForm(params) {
    return this.request(Object.assign(
      params,
      {
        method: 'post',
        data: stringify(params.data),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    ));
  }
}

module.exports = Client;
