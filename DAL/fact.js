const Fact = require('../models/Fact')

module.exports.findAllFacts = () => {
  return Fact.find().populate('category').sort('-created_date').lean()
}

module.exports.findFactsAfterDate = (date) => {
  return Fact.find({ created_date: { $gt: date } }).populate('category').sort('-created_date').lean()
}

module.exports.findFactByCategoryID = (category_id) => {
  return Fact.find({ category: category_id }).lean()
}

module.exports.createFact = async (text, category) => {
  const fact = new Fact({
    text: text,
    category: category
  })
  await fact.save()
  return fact
}

module.exports.deleteFact = async (id) => {
  await Fact.findByIdAndDelete(id)
}
