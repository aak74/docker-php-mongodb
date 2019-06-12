class Router {
  execute(func) {
    return this[func].bind(this);
  }

  getRoute() {
    return this.execute('route');
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
}

module.exports = Router;
