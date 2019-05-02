

class Token extends TokenBase {
  set token(token) {
    super();
    localStorage.setItem('token', token);
  }

  set refreshToken(refreshToken) {
    super();
    localStorage.setItem('refreshToken', refreshToken);
  }
}

export default Token;
