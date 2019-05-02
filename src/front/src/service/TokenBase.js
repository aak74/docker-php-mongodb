/* eslint-disable consistent-return, no-console */

class TokenBase {
  constructor({ token, refreshToken }) {
    this.t = 123;
    this._token = token;
    this._refreshToken = refreshToken;
  }

  get token() {
    console.log('getToken', this);
    return this._token;
  }

  set token(token) {
    this._token = token;
  }

  get refreshToken() {
    return this._refreshToken;
  }

  set refreshToken(refreshToken) {
    this._refreshToken = refreshToken;
  }
}

export default TokenBase;
