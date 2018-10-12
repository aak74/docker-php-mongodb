const proxy = {
  target: 'http://localhost/',
  changeOrigin: true,
};

module.exports = {
  '/api': proxy,
};
