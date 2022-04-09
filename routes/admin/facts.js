const express = require('express')
const { Fact, Category, FactCategory } = require('../../DAL')
const checkPermission = require('../../middlewares/checkPermission')
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
  const { fact_title, fact_text, fact_category } = req.body
  const categories = Array.isArray(fact_category) ? fact_category : [fact_category]
  const fact = await Fact.create({ title: fact_title, description: fact_text })
  await FactCategory.bulkCreate(categories.map(category => ({ fact_id: fact.id, category_id: parseInt(category) })))
  res.redirect('/admin/facts')
})

router.post('/delete/:id', checkPermission(), async (req, res) => {
  await Fact.destroy({ where: { id: req.params.id } })
  res.redirect('/admin/facts')
})

module.exports = router
