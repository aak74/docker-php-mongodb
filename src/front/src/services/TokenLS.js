/* eslint-disable class-methods-use-this */
import TokenBase from './TokenBase';

class TokenLS extends TokenBase {
  constructor() {
    super({ token: null, refreshToken: null });
    this.token = localStorage.getItem('token');
    this.refreshToken = localStorage.getItem('refreshToken');
  }

  saveToken(token) {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  saveRefreshToken(refreshToken) {
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    } else {
      localStorage.removeItem('refreshToken');
    }
  }
}

export default TokenLS;
