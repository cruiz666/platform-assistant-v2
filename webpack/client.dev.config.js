const { merge } = require('webpack-merge')
const baseConfig = require('./client.base.config')
const webpack = require('webpack')
const path = require('path')

const clientPort = 8080
const serverPort = process.env.PLATFORM_SERVER_STARTED
  ? 3000
  : 443

const host = 'http://localhost'

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'inline-source-map',
  output: {
    publicPath: `${host}:${clientPort}/`
  },
  devServer: {
    historyApiFallback: true,
    static: [
      path.join(__dirname, '..', 'src', 'client', 'public'),
      {
        directory: path.resolve(),
        watch: false
      }
    ],
    port: clientPort,
    proxy: {
      '/api/*': {
        target: `${host}:${serverPort}`,
        pathRewrite: {
          '/api': ''
        }
      }
    },
    allowedHosts: ['*'],
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization, X-Api-Token'
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})
