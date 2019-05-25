const express = require('express');

// eslint-disable-next-line no-multi-assign
express.application.group = express.Router.group = function group(arg1, arg2) {
  let fn;
  let path;

  if (arg2 === undefined) {
    path = '/';
    fn = arg1;
  } else {
    path = arg1;
    fn = arg2;
  }

  const router = express.Router();
  // console.log('group', this);

  fn(router);
  this.use(path, router);
  return router;
};
