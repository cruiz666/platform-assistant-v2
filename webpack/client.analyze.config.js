const { merge } = require('webpack-merge')
const baseConfig = require('./client.prod.config')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerPort: 8082
    })
  ]
})
