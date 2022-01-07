const Category = require('../models/Category')

module.exports.getAllCategories = () => {
  return Category.find({}).lean()
}

module.exports.getCategoryByID = (id) => {
  return Category.findById(id).lean()
}

module.exports.createCategory = async (name) => {
  const category = new Category({
    name: name
  })
  await category.save()
  return category
}

module.exports.deleteCategory = async (id) => {
  await Category.findByIdAndDelete(id)
}
