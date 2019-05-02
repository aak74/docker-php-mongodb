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
    this.beforeSetToken(token);
    this._token = token;
  }

  beforeSetToken(token) {
  }

  get refreshToken() {
    return this._refreshToken;
  }

  set refreshToken(refreshToken) {
    this.beforeSetRefreshToken(refreshToken);
    this._refreshToken = refreshToken;
  }

  beforeSetRefreshToken(refreshToken) {
  }
}

export default TokenBase;
