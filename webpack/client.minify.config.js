const TerserPlugin = require('terser-webpack-plugin')
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = [
  // new TerserPlugin({
  //   sourceMap: false,
  //   parallel: false,
  //   cache: true,
  //   test: /\.js/,
  //   chunkFilter: chunk => {
  //     return !/vendors/.test(chunk.chunkReason || '')
  //   },
  //   terserOptions: {
  //     nameCache: {},
  //     keep_quoted: true,
  //     evaluate: false,
  //     sequences: false,
  //     builtins: false,
  //     domprops: false,
  //     compress: false,
  //     mangle: {
  //       toplevel: true,
  //       properties: {
  //         regex: /^_./,
  //         keep_quoted: true,
  //         reserved: require('uglify-js/tools/domprops')
  //       }
  //     }
  //   }
  // }),
  // new OptimizeCSSAssetsPlugin({
  //   cssProcessorPluginOptions: {
  //     preset: ['default', { discardComments: { removeAll: true } }]
  //   }
  // }),
  new TerserPlugin({
    extractComments: false,
    terserOptions: {
      sourceMap: false,
      compress: true,
      format: {
        comments: false,
        beautify: false
      }
    }
    // // sourceMap: false,
    // parallel: true,
    // // cache: true,
    // terserOptions: {
    //   // warnings: true,
    //   // evaluate: true,
    //   sequences: true,
    //   builtins: false,
    //   domprops: false,
    //   toplevel: true,
    //   nameCache: {},
    //   compress: {
    //     comparisons: true,
    //     conditionals: true,
    //     booleans: true,
    //     loops: true,
    //     sequences: true,
    //     join_vars: true,
    //     negate_iife: true,
    //     evaluate: true,
    //     dead_code: true,
    //     unused: true,
    //     // inline: true,
    //     // keep_fnames: false,
    //     keep_infinity: true,
    //     properties: true,
    //     reduce_funcs: true,
    //     toplevel: true,
    //     passes: 4
    //   },
    //   mangle: {
    //     properties: false,
    //     keep_fnames: false,
    //     toplevel: true
    //   },
    //   output: {
    //     comments: false,
    //     beautify: false
    //   }
    // }
  })
]
