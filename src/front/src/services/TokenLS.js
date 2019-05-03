/* eslint-disable class-methods-use-this */
import TokenBase from './TokenBase';

class TokenLS extends TokenBase {
  constructor() {
    super({ token: null, refreshToken: null });
    this.token = localStorage.getItem('token');
    this.refreshToken = localStorage.getItem('refreshToken');
  }

  saveToken(token) {
    localStorage.setItem('token', token);
  }

  saveRefreshToken(refreshToken) {
    localStorage.setItem('refreshToken', refreshToken);
  }
}

export default TokenLS;
