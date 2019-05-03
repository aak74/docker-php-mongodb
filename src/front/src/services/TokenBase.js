/* eslint-disable class-methods-use-this */
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
    this.saveToken(token);
    this._token = token;
  }

  saveToken() {
  }

  get refreshToken() {
    return this._refreshToken;
  }

  set refreshToken(refreshToken) {
    this.saveRefreshToken(refreshToken);
    this._refreshToken = refreshToken;
  }

  saveRefreshToken() {
  }
}

export default TokenBase;
