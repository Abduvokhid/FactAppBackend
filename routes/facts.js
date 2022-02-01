const express = require('express')
const { Fact, Category, FactCategory } = require('../DAL')
const checkPermission = require('../middlewares/checkPermission')
const { Op } = require('sequelize')
const router = express.Router()

router.get('/', checkPermission(), async (req, res) => {
  const facts = await Fact.findAll({
    include: [{
      model: Category, through: FactCategory
    }]
  })
  const categories = await Category.findAll()
  const error = req.getFlash('error')
  res.render('facts/index', { facts, categories, error })
})

router.post('/add', checkPermission(), async (req, res) => {
  const { fact_title, fact_description, fact_category } = req.body
  const categories = []
  if (Array.isArray(fact_category)) {
    const selected_cats = await Category.findAll({ where: { id: { [Op.in]: fact_category } }, attributes: ['id'] })
    categories.push(...selected_cats.map(c => c.id))
  } else {
    const category = await Category.findByPk(fact_category)
    categories.push(category.id)
  }
  if (categories.length < 1) {
    req.setFlash('error', 'Tanlangan kategoriya mavjud emas. Sahifani yangilab qaytadan urinib ko\'ring.')
    return res.redirect('/facts')
  }
  const fact = await Fact.create({ title: fact_title, description: fact_description })
  for (const category of categories) {
    await FactCategory.create({
      fact_id: fact.id,
      category_id: category
    })
  }
  res.redirect('/facts')
})

router.post('/delete/:id', checkPermission(), async (req, res) => {
  await Fact.destroy({ where: { id: req.params.id } })
  res.redirect('/facts')
})

module.exports = router
