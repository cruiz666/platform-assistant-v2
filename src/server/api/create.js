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
      required: true,
      description: 'name',
      min: 1,
      max: 100,
      trim: true
    }
  }
}, async event => {
  const {
    auth: {
      account
    },
    body
  } = event.request

  const data = {
    account: ObjectId(account),
    ...body
  }

  const query = new ModelName(data)

  // Validation mmust be done before saving
  query.validate()

  return {
    status: 'OK',
    data: await query.exec()
  }
})

module.exports = handler
