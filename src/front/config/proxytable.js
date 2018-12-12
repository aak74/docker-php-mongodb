const proxy = {
  target: 'http://localhost/',
  changeOrigin: true,
  // auth: 'login:password',
}
module.exports = {
  '/api': proxy,
}
