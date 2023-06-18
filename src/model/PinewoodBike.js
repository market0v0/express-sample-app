const mongoose = require('mongoose')

const { Schema } = mongoose

const PinewoodBikeSchema = new Schema(
  {
    model: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: [String], required: true },
    specs: { type: String, required: true },
    category: { type: String, required: true },
    youtube: { type: String, required: true },
    facebook: { type: String, required: true }
  },
  {
    versionKey: false
  }
)

module.exports = mongoose.model('PinewoodBike', PinewoodBikeSchema)
