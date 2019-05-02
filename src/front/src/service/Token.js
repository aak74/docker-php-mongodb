/* eslint-disable class-methods-use-this */
import TokenBase from './TokenBase';

class Token extends TokenBase {
  beforeSetToken(token) {
    localStorage.setItem('token', token);
  }

  beforeSetRefreshToken(refreshToken) {
    localStorage.setItem('refreshToken', refreshToken);
  }
}

export default Token;
