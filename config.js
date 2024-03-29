'use strict'
const platformConfig = require('./platform.config.js')
const { config } = require('@mediastream/platform-microservice-sdk')
const alias = require('./moduleAlias.json')
const path = require('path')

const {
  service, apiPrefix
} = platformConfig()

const project = service
const basePath = apiPrefix

const ENV_TYPES = {
  PROD: 'prod',
  DEV: 'dev',
  QA: 'qa',
  LOCAL: 'local'
}

const PRIMARY_DOMAIN = 'api.platform.mediastre.am'

const DEPLOY_DOMAIN = {
  prod: `${PRIMARY_DOMAIN}`,
  qa: `qa-${PRIMARY_DOMAIN}`,
  dev: `dev-${PRIMARY_DOMAIN}`
}

const DATABASE_PROXY_URLS = {
  prod: 'platform-mongodb-prod-proxy',
  qa: 'platform-mongodb-qa-proxy',
  dev: 'platform-mongodb-dev-proxy'
}

const MICROSERVICE_HOST = {
  prod: 'api.platform.mediastre.am',
  qa: 'qa-api.platform.mediastre.am',
  dev: 'dev-api.platform.mediastre.am'
}

const authScope = process.env.CUSTOM_ENV || ENV_TYPES.DEV

module.exports = {
  PROJECT_NAME: `${project}`,
  DOMAIN: `${project}`,
  ENV: process.env.CUSTOM_ENV || ENV_TYPES.DEV,
  ENV_TYPES: ENV_TYPES,
  MICROSERVICE_HOST: MICROSERVICE_HOST[process.env.CUSTOM_ENV] || MICROSERVICE_HOST.dev,
  DATABASE_PROXY_URL: DATABASE_PROXY_URLS[process.env.CUSTOM_ENV] || DATABASE_PROXY_URLS.dev,
  PLATFORM_CONFIG: JSON.stringify(platformConfig()),
  custom: {},
  stage: process.env.CUSTOM_ENV || ENV_TYPES.DEV,
  domains: DEPLOY_DOMAIN,
  customDomain: {
    basePath: `${basePath}`,
    domainName: DEPLOY_DOMAIN[process.env.CUSTOM_ENV || ENV_TYPES.DEV],
    stage: process.env.CUSTOM_ENV || ENV_TYPES.DEV,
    createRoute53Record: true
  },
  apigwBinary: {
    types: [
      'multipart/form-data'
    ]
  },
  authorizer: {
    getPermissions: {
      arn: `arn:aws:lambda:us-east-1:934583553888:function:platform-microservice-authorizer-${authScope}-authorizer`,
      type: 'request',
      identitySource: 'method.request.header.X-Api-Token'
    }
  },
  contentEncoding: {
    contentCompression: 100
  },
  cors: {
    origin: '*',
    headers: [
      'Content-Type',
      'X-Amz-Date',
      'Authorization',
      'X-Api-Key',
      'X-Amz-Security-Token',
      'X-Amz-User-Agent',
      'X-Api-Token'
    ],
    allowCredentials: false
  },
  apiHandler: {
    handler: config.getHandler(),
    events: config.getRoutes(),
    layers: [],
    tracing: false
  },
  'serverless-offline': {
    prefix: apiPrefix,
    noPrependStageInUrl: true,
    httpPort: 3000,
    lambdaPort: 3002
  },
  bundle: {
    esbuild: true,
    aliases: Object.keys(alias).map(key => ({
      [key]: path.relative('.', alias[key])
    }))
  },
  tags: {
    Product: `Platform Microservice - ${(process.env.CUSTOM_ENV || ENV_TYPES.DEV).toUpperCase()}`,
    Microservice: 'REPLACE WITH MICROSERVICE NAME (EXAMPLE: "Federation")',
    Name: `${project}-${(process.env.CUSTOM_ENV || ENV_TYPES.DEV).toLowerCase()}`
  },
  logRetentionInDays: 1
}
