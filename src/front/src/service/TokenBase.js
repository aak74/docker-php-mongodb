/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */

class TokenBase {
  constructor({ token, refreshToken }) {
    this._token = token;
    this._refreshToken = refreshToken;
  }

  get token() {
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
