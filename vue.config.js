const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,
    host: '0.0.0.0',
    // port: 8081,
    // https: false,
    // hotOnly: false,
    proxy: {
      '/api': {
        target: 'http://sm.singzer.cn/',
        changeOrigin: true,
        ws:true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/app':{
        target: 'http://192.168.31.102:8080/',
        changeOrigin: true,
        ws:true,
        pathRewrite: {
          '^/app': ''
        }
    }
    }
  }
})
