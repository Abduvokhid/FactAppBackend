const express = require('express')
const { Fact, Category, FactCategory } = require('../DAL')
const checkPermission = require('../middlewares/checkPermission')
const router = express.Router()

router.get('/', checkPermission(), async (req, res) => {
  const facts = await Fact.findAll({
    include: [{
      model: Category, through: FactCategory
    }]
  })
  const categories = await Category.findAll()
  const error = req.cookies.error
  res.clearCookie('error', { maxAge: 0 })
  res.render('facts/index', { facts, categories, error })
})

router.post('/add', checkPermission(), async (req, res) => {
  const { fact_text, fact_category } = req.body
  console.log(req.body)
  const category = await Category.findByPk(fact_category)
  if (!category) {
    res.cookie('error', 'Tanlangan kategoriya mavjud emas. Sahifani yangilab qaytadan urinib ko\'ring.')
    return res.redirect('/facts')
  }
  const fact = await Fact.create({ title: fact_text, description: fact_text })
  await FactCategory.create({
    fact_id: fact.id,
    category_id: category.id
  })
  res.redirect('/facts')
})

router.post('/delete/:id', checkPermission(), async (req, res) => {
  await Fact.destroy({ where: { id: req.params.id } })
  res.redirect('/facts')
})

module.exports = router
