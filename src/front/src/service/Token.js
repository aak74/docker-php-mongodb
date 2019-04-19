'use strict';

class Token {
  constuctor() {
    this.token = localStorage.getItem('token');
    this.refreshToken = localStorage.getItem('refreshToken');
  }

  getToken() {
    // debugger;
    return localStorage.getItem('token');
    // return this.token;
  }

  getRefreshToken() {
    // debugger;
    return localStorage.getItem('refreshToken');
    // return this.refreshToken;
  }
}

export default Token;
