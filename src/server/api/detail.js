const {
  router: platformRouter,
  db: { ObjectId }
} = require('@mediastream/platform-microservice-sdk')

const {
  ModelName
} = require('../model/index')

const handler = new platformRouter.Route({
  permissions: [
    'module_name.read'
  ],
  params: {
    moduleNameId: {
      type: ObjectId,
      description: 'moduleName id',
      required: true
    }
  }
}, async event => {
  const {
    auth: {
      account
    },
    params: {
      moduleNameId
    }
  } = event.request

  const data = await ModelName.findOne({
    account: ObjectId(account),
    _id: moduleNameId
  }).exec()

  if (data) {
    return {
      status: 'OK',
      data
    }
  }

  throw Object.assign(new Error('NOT_FOUND'), {
    code: 404
  })
})

module.exports = handler
