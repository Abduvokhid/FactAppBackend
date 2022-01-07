const mongoose = require('mongoose')

const FactSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    required: true
  },
  created_date: {
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false
})

module.exports = Fact = mongoose.model('fact', FactSchema)
