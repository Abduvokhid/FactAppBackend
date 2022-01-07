const User = require('../models/User')

module.exports.getUserByID = (id) => {
  return User.findById(id).lean()
}

module.exports.getUserByEmail = (email) => {
  return User.findOne({ email: email })
}
