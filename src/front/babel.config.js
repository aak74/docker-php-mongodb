module.exports = {
  presets: [
    '@babel/preset-env',
    '@vue/app'
  ],
  ignore: [/[\/\\]core-js/, /@babel[\/\\]runtime/],
  // "env": {
  //   "test": {
  //     "plugins": ["transform-es2015-modules-commonjs"]
  //   }
  // }
}
