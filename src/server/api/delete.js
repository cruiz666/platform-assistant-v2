const {
  router: platformRouter,
  db: { ObjectId }
} = require('@mediastream/platform-microservice-sdk')

const {
  ModelName
} = require('../model/index')

const handler = new platformRouter.Route({
  permissions: [
    'module_name.delete'
  ],
  params: {
    moduleNameId: {
      type: ObjectId,
      description: 'ModuleName id',
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

  const resp = await ModelName.deleteOne({
    account: ObjectId(account),
    _id: moduleNameId
  }).exec()

  if (resp.n === 1) {
    return { status: 'OK' }
  }

  throw Object.assign(new Error('NOT_FOUND'), {
    code: 404
  })
})

module.exports = handler
