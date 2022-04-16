const express = require('express')
const { Fact, Category, FactCategory } = require('../../DAL')
const checkPermission = require('../../middlewares/checkPermission')
const router = express.Router()

router.use([
  checkPermission(),
])

router.get('/', async (req, res) => {
  const { limit, page } = req.query
  const l = parseInt(limit) || 50, p = parseInt(page) || 1

  const factsAll = await Fact.findAll({
    include: [{
      model: Category, through: FactCategory
    }],
    order: [['id', 'ASC']],
  })

  const start = (p - 1) * l
  const facts = factsAll.slice(start, start + l)

  const meta = {
    pagesCount: Math.ceil(factsAll.length / l),
    currentPage: p,
    previousPage: p,
    firstPage: p,
    nextPage: p,
    lastPage: p,
  }
  if (p > 1) {
    meta.previousPage = p - 1
    meta.firstPage = 1
  }
  if (meta.pagesCount > p) {
    meta.nextPage = p + 1
    meta.lastPage = meta.pagesCount
  }

  const error = req.cookies.error
  res.clearCookie('error', { maxAge: 0 })
  res.render('facts/index', { facts, meta, error })
})

router.get('/add', async (req, res) => {
  const categories = await Category.findAll()
  const error = req.cookies.error
  res.clearCookie('error', { maxAge: 0 })
  res.render('facts/create', { categories, error })
})

router.post('/add', async (req, res) => {
  const { fact_title, fact_text, fact_category } = req.body
  const categories = Array.isArray(fact_category) ? fact_category : [fact_category]
  const fact = await Fact.create({ title: fact_title, description: fact_text })
  await FactCategory.bulkCreate(categories.map(category => ({ fact_id: fact.id, category_id: parseInt(category) })))
  res.redirect('/admin/facts')
})

router.get('/edit/:id', async (req, res) => {
  const fact = await Fact.findByPk(req.params.id, { include: { association: 'categories' } })
  const selectedCategories = fact.categories.map(category => category.id)
  const categories = await Category.findAll()
  const error = req.cookies.error
  res.clearCookie('error', { maxAge: 0 })
  res.render('facts/edit', { fact, selectedCategories, categories, error })
})

router.post('/edit', async (req, res) => {
  const { fact_title, fact_text, fact_category, fact_id } = req.body
  const categories = Array.isArray(fact_category) ? fact_category : [fact_category]
  await Fact.update({ title: fact_title, description: fact_text }, { where: { id: fact_id } })
  for (const category of categories) {
    await FactCategory.findOrCreate({
      where: {
        fact_id: fact_id,
        category_id: category,
      },
      defaults: {
        fact_id: fact_id,
        category_id: category,
      }
    })
  }
  res.redirect('/admin/facts')
})

router.post('/delete/:id', async (req, res) => {
  await Fact.destroy({ where: { id: req.params.id } })
  res.redirect('/admin/facts')
})

module.exports = router
