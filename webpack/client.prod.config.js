const { merge } = require('webpack-merge')
const baseConfig = require('./client.base.config')
const minify = require('./client.minify.config')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const WorkboxPlugin = require('workbox-webpack-plugin')
// const BrotliPlugin = require('brotli-webpack-plugin')
// const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
// const webpack = require('webpack')

module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        '**/*',
        '!.git_keep'
      ]
    })
    // new WorkboxPlugin.GenerateSW({
    //   // these options encourage the ServiceWorkers to get in there fast
    //   // and not allow any straggling "old" SWs to hang around
    //   clientsClaim: true,
    //   skipWaiting: true
    // })
    // new BrotliPlugin({
    //   // asset: '[path].br[query]',
    //   // test: /\.(js|css|html|svg)$/,
    //   // threshold: 10240,
    //   minRatio: 0.9
    // }),
    // new LodashModuleReplacementPlugin(),
    // new webpack.HashedModuleIdsPlugin(),
    // new webpack.optimize.AggressiveMergingPlugin()
  ],
  optimization: {
    // minimize: false
    minimizer: minify
  },
  output: {
    // TODO: Get host from ENV
    // publicPath: `http://streammanager.co/js/`
  }
})
