'use strict';

var pass = null;

class Auth {
  constructor({ logger, jwt, passportJWT, passport }) {
    this.logger = logger;
    this.passport = passport;
    pass = passport;
    this.jwt = jwt;
    this.passportJWT = passportJWT;
    this.init();
  }

  init() {
    this.options = {
      jwtFromRequest: this.passportJWT.ExtractJwt.fromAuthHeaderWithScheme('jwt'),
      secretOrKey: 'ArealJWTkey',
    };
    this.verifyKey = 'ArealGroup';
    this.passport.initialize();
    this.newStrategy();
    // app.use(passport.initialize());
  }

  getToken(payload) {
    return this.jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: payload,
      },
      this.options.secretOrKey
    );
  }

  getRefreshToken(payload) {
    // verifyKey: this.auth.verifyKey,

    return this.jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 30),
        data: payload,
      },
      this.options.secretOrKey
    );
  }

  newStrategy() {
    const strategy = new this.passportJWT.Strategy(this.options, ((jwt_payload, next) => {
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
    this.passport.use(strategy);
  }

  auth() {
    return this.passport.authenticate('jwt', { session: false });
  }

  authMiddleware(req, res, next) {
    // return true;
    // console.log('authMiddleware', Router);

    pass.authenticate('jwt', { session: false });
    next();
  };

}

module.exports = Auth;
