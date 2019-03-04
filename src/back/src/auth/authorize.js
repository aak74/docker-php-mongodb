const lodash = require('lodash');
const passportJWT = require('passport-jwt');

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const users = [{
  id: 1,
  name: 'admin',
  password: 'admin',
}];
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'tasmanianDevil';

const controller = require('../controller/UserController');
const auth = require('../model/User');



const strategy = new JwtStrategy(jwtOptions, ((jwt_payload, next) => {
  console.log('payload received', jwt_payload);
  // usually this would be a database call:
  const data = {
    _id: jwt_payload.id,
  };
  const userLogin = users[lodash.findIndex(users, { id: jwt_payload.id })];
  const g = jwt_payload;
  if (g) {
    console.log('запустил');
    next(null, g);
  } else {
    console.log('не запустил');
    next(null, false);
  }
}));

module.exports = strategy;
module.exports.jwtOptions = jwtOptions;
