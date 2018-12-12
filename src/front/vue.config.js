module.exports = {
  devServer: {
    proxy: 'http://localhost'
  },

  baseUrl: undefined,
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: true,
  productionSourceMap: undefined,
  parallel: undefined,
  css: undefined,

  pluginOptions: {
    'resolve-alias': {
      alias: {
        src: '',
        components: ''
      }
    }
  }
}
