const {
  router: platformRouter,
  db: { ObjectId }
} = require('@mediastream/platform-microservice-sdk')

const {
  ModelName
} = require('../model/index')

const handler = new platformRouter.Route({
  permissions: [
    'module_name.write'
  ],
  body: {
    name: {
      type: String,
      description: 'ModuleName name',
      min: 1,
      max: 100,
      trim: true
    }
  },
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
    body,
    params: {
      moduleNameId
    }
  } = event.request

  if (!Object.keys(body).length) {
    throw Object.assign(new Error('VALIDATION_ERROR'), {
      code: 400,
      errors: ['Nothing to update']
    })
  }

  // Validation mmust be done before saving.
  // Don't enforce required, as they are enfoced when creating
  ModelName.validate(body, true)

  const query = ModelName.updateOne({
    account: ObjectId(account),
    _id: moduleNameId
  }, {
    $set: body
  })

  const resp = await query.exec()

  if (resp.n === 1) {
    return {
      status: 'OK',
      data: await ModelName.findOne({
        _id: moduleNameId
      }).exec()
    }
  }

  throw Object.assign(new Error('NOT_FOUND'), {
    code: 404
  })
})

module.exports = handler
