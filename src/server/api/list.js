const {
  router: platformRouter,
  db: { ObjectId },
  helper: { escapeRegExp }
} = require('@mediastream/platform-microservice-sdk')

const {
  ModelName
} = require('../model/index')

const handler = new platformRouter.Route({
  permissions: [
    'module_name.read'
  ],
  qs: {
    name: {
      type: String,
      description: 'Filter by name',
      trim: true
    },
    skip: {
      required: true,
      default: 0,
      type: Number,
      description: 'Pagination skip items'
    },
    limit: {
      required: true,
      default: 100,
      min: 1,
      max: 100,
      type: Number,
      description: 'Pagination limit items'
    },
    count: {
      required: false,
      default: false,
      type: Boolean,
      description: 'Count items'
    }
  }
}, async event => {
  const {
    auth: {
      account
    },
    qs: {
      count,
      name,
      skip,
      limit
    }
  } = event.request

  const query = ModelName[count ? 'count' : 'find']({
    account: ObjectId(account)
  })

  if (name) {
    query.where('name', new RegExp(escapeRegExp(name), 'i'))
  }

  query.skip(skip)
  query.limit(limit)

  query.sort('name')

  return {
    status: 'OK',
    data: await query.exec()
  }
})

module.exports = handler
