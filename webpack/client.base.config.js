const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { getAlias } = require('@mediastream/platform-microservice-sdk')
const moduleAlias = require('../moduleAlias.json')

let lastProgress = 0

const ENV_TYPES = {
  PROD: 'prod',
  DEV: 'dev',
  QA: 'qa',
  LOCAL: 'local'
}

const PRIMARY_DOMAIN = 'api.platform.mediastre.am'

const DEPLOY_DOMAIN = {
  prod: `https://${PRIMARY_DOMAIN}`,
  qa: `https://qa-${PRIMARY_DOMAIN}`,
  dev: `https://dev-${PRIMARY_DOMAIN}`
}

const API_BASE_URL = process.env.PLATFORM_SERVER_STARTED === 'true'
  ? '/api'
  : DEPLOY_DOMAIN[process.env.CUSTOM_ENV || ENV_TYPES.DEV]

module.exports = {
  entry: {
    app: './src/client/index.js'
  },
  output: {
    chunkFilename: '[contenthash:8].js',
    path: path.resolve(__dirname, '..', 'dist'),
    filename: '[name].js',
    pathinfo: false,
    crossOriginLoading: 'anonymous',
    globalObject: 'this'
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }), // Remove moments.js locales
    new webpack.DefinePlugin({
      IS_OFFLINE: process.env.IS_OFFLINE,
      API_BASE_URL: JSON.stringify(API_BASE_URL)
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[chunkhash][id].css'
    }),
    // new webpack.optimize.AggressiveMergingPlugin({
    //   minSize: 30000,
    //   maxSize: 50000
    // }),
    // new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.ProgressPlugin((percent, message) => {
      const currentProgress = parseInt(percent * 100)
      if (lastProgress !== currentProgress) {
        lastProgress = currentProgress
        console.log('BUILDING: ', currentProgress, '%')
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.less', 'scss'],
    alias: {
      ...getAlias(),
      ...(Object.keys(moduleAlias).reduce((acc, key) => ({
        ...acc,
        [key]: path.resolve(moduleAlias[key])
      }), {})),
      '@': path.resolve(__dirname, '..', 'src', 'client'),
      ROOT: path.resolve(__dirname, '..'),
      STYLE: path.resolve(
        __dirname,
        '..',
        'src',
        'client',
        'assets',
        'style',
        'index.js'
      )
    }
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        type: 'asset/source'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: mod => /\/ckeditor/.test(mod) || (!/@mediastream\/platform-microservice-sdk/.test(mod) && /node_modules/.test(mod))
      },
      {
        test: /\.(s?c|le)ss$/,
        // sideEffects: true,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              modules: {
                mode: 'local',
                localIdentName: 'ms-[local]',
                getLocalIdent: (context, localIdentName, localName, options) => {
                  return /^(Toastify|hljs|language)/.test(localName) ? localName : `ms-${localName}`
                }
              },
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    require('postcss-combine-duplicated-selectors'),
                    require('autoprefixer'),
                    require('postcss-remove-root')
                  ]
                ]
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              implementation: require('sass')
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          'babel-loader',
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true
            }
          }
        ]
      }
    ]
  },
  optimization: {
    usedExports: true,
    mangleWasmImports: true,
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
          filename: '[contenthash:8].js'
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
          filename: '[contenthash:8].js'
        }
      }
    }
  }
}
