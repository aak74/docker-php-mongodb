/* eslint-disable max-len */
/* eslint-disable no-multi-assign */
const express = require('express');

express.application.group = express.Router.group = function group(path, routerOrMiddlewares, router) {
  const expressRouter = express.Router();
  if (router === undefined) {
    routerOrMiddlewares(expressRouter);
    this.use(path, expressRouter);
    return expressRouter;
  }
  router(expressRouter);
  this.use(path, routerOrMiddlewares, expressRouter);
  return expressRouter;
};
