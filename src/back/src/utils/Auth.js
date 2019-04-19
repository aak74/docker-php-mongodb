'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');

class Auth {
  constructor({ logger, userModel }) {
    this.logger = logger;
    this.userModel = userModel;
    this.init();
  }

  init() {
    this.options = {
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
      secretOrKey: 'ArealJWTkey',
    };
    // this.verifyKey = 'ArealGroup';
    passport.initialize();
    this.newStrategy();
    this.authenticate = passport.authenticate('jwt', { session: false });
  }

  getToken(payload) {
    return jwt.sign(
      {
        // exp: Math.floor(Date.now() / 1000) + 5,
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: payload,
      },
      this.options.secretOrKey
    );
  }

  getRefreshToken(payload) {
    return jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 30),
        data: payload,
      },
      this.options.secretOrKey
    );
  }

  newStrategy() {
    const strategy = new passportJWT.Strategy(
      this.options, 
      async (payload, cb) => {
        try {
          const user = await this.userModel.findOne(payload.data);
          delete(user.password);
          cb(false, user);
        } catch (err) {
          return cb(err);
        }
      });
    passport.use(strategy);
  }

  auth(req, res, next) {
    this.authenticate(req, res, next);
  }

  passport() {
    return passport;
  }
}

module.exports = Auth;
