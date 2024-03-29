'use strict'
// Configure module alias for easy requiring
const moduleAlias = require('module-alias')
const path = require('path')
const _alias = require('./moduleAlias.json') || {}
const { getAlias } = require('@mediastream/platform-microservice-sdk')

const alias = Object.assign({}, getAlias(), _alias)

moduleAlias.addAliases(Object.keys(alias).reduce((acc, key) => ({
  ...acc,
  [key]: path.resolve(alias[key])
}), {}))

// Consistency config loader for serverless yml file from js config files
// For more details: https://github.com/serverless/serverless/issues/3841
module.exports = () => {
  const config = require('./config.js')
  return { config: JSON.parse(JSON.stringify(config)) }
}
