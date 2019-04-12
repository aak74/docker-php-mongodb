'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');



// var pass = null;

class Auth {
  constructor({ logger }) {
    this.logger = logger;
    // this.passport = passport;
    // pass = passport;
    // this.jwt = jwt;
    // this.passportJWT = passportJWT;
    this.init();
  }

  init() {
    this.options = {
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderWithScheme('jwt'),
      secretOrKey: 'ArealJWTkey',
    };
    this.verifyKey = 'ArealGroup';
    passport.initialize();
    this.newStrategy();
    this.authenticate = passport.authenticate('jwt', { session: false });
    // app.use(passport.initialize());
  }

  getToken(payload) {
    return jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: payload,
      },
      this.options.secretOrKey
    );
  }

  getRefreshToken(payload) {
    // verifyKey: this.auth.verifyKey,

    return jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 30),
        data: payload,
      },
      this.options.secretOrKey
    );
  }

  newStrategy() {
    const strategy = new passportJWT.Strategy(this.options, ((jwt_payload, next) => {
      // usually this would be a database call:
      if (!jwt_payload.tokenToReftesh) {
        if (((jwt_payload.verifyKey === this.verifyKey) && ((jwt_payload.date + 15000) > Date.now())) && (!jwt_payload.blocked)) {
          next(null, jwt_payload);
        } else {
          next(null, false);
        }
      } else {
        if (jwt_payload.verifyKey === this.verifyKey) {
          next(null, jwt_payload);
        } else {
          next(null, false);
        }
      }
    }));
    passport.use(strategy);
  }

  auth(req, res, next) {
    // console.log('auth', req.headers.authorization, res, next);
    console.log('auth1', req.url);
    if ((req.url == '/') || (req.url == '/status') || (req.url == '/user/login')) {
    // if (req.url === '/user/login') {
      console.log('auth10');
      req.user = { id: '5ca60cb3e45e3a016b49b474' };
      next();
      return;
    }
    console.log('auth2', req.url);
    // console.log('auth', req.url, req.headers);

    // console.log('auth', passport);
    const x = this.authenticate(req, res);
    console.log('auth2', req.user, x);
    next();
  }

  passport() {
    return passport;
  }
}

module.exports = Auth;
