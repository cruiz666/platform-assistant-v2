
const { db: { Schema } } = require('@mediastream/platform-microservice-sdk')

const schema = new Schema('model_collection_name', {
  account: {
    type: Schema.Types.ObjectId,
    index: true,
    required: true
  },
  name: {
    type: Schema.Types.String,
    required: true,
    index: true,
    min: 1,
    max: 100
  }
})

module.exports = schema
