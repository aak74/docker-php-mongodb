class Router {
  constructor(controller) {
    this.controller = controller;
  }

  getRoute() {
    return this.route.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  send500(res, err) {
    console.log('send500', err);
    this.sendError(res, 500, { status: 'error', message: err.toString() });
  }

  // eslint-disable-next-line class-methods-use-this
  send200(res, data) {
    if (data) {
      return res.status(200).send({ status: 'ok', data });
    }
    return res.status(200).send({ status: 'ok' });
  }

  // eslint-disable-next-line class-methods-use-this
  sendError(res, statusCode, message) {
    res.status(statusCode).send({ status: 'error', message });
  }

  get(queryName, params) {
    console.log('get', queryName, params);

    return this.controller.get(queryName, params);
  }

  execute(commandName, params) {
    return this.controller.execute(commandName, params);
  }
}

module.exports = Router;
