/* eslint-disable class-methods-use-this */
/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */

class TokenBase {
  constructor({ token, refreshToken }) {
    this._token = token;
    this._refreshToken = refreshToken;
    this.needToSave = false;
  }

  get token() {
    return this._token;
  }

  set token(token) {
    if (this.needToSave) {
      this.saveToken(token);
    }
    this._token = token;
  }

  saveToken() {
  }

  get refreshToken() {
    return this._refreshToken;
  }

  set refreshToken(refreshToken) {
    if (this.needToSave) {
      this.saveRefreshToken(refreshToken);
    }
    this._refreshToken = refreshToken;
  }

  saveRefreshToken() {
  }

  setNeedToSave(needToSave) {
    this.needToSave = needToSave;
  }
}

export default TokenBase;
