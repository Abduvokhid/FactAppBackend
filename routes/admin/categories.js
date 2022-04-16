const express = require('express')
const { Category, FactCategory } = require('../../DAL')
const checkPermission = require('../../middlewares/checkPermission')
const router = express.Router()

router.use([
  checkPermission(),
])

router.get('/', async (req, res) => {
  const categories = await Category.findAll()
  // console.log(categories)
  const error = req.cookies.error
  res.clearCookie('error', { maxAge: 0 })
  res.render('categories/index', { categories, error })
})

router.get('/add', async (req, res) => {
  const error = req.cookies.error
  res.clearCookie('error', { maxAge: 0 })
  res.render('categories/create', { error })
})

router.post('/add', async (req, res) => {
  const name = req.body.category_name
  await Category.create({ name })
  res.redirect('/admin/categories')
})

router.get('/edit/:id', async (req, res) => {
  const category = await Category.findByPk(req.params.id)
  const error = req.cookies.error
  res.clearCookie('error', { maxAge: 0 })
  res.render('categories/edit', { category, error })
})

router.post('/edit', async (req, res) => {
  await Category.update({ name: req.body.category_name }, { where: { id: req.body.category_id } })
  res.redirect('/admin/categories')
})

router.post('/delete/:id', async (req, res) => {
  const { count } = await FactCategory.findAndCountAll({ where: { category_id: req.params.id } })
  if (count > 0) {
    res.cookie('error', 'Ushbu kategoriyaga ulangan faktlar bor. Avval ularni o\'chiring yoki kategoriyasini o\'zgartiring')
    return res.redirect('/admin/categories')
  }
  await Category.destroy({ where: { id: req.params.id } })
  res.redirect('/admin/categories')
})

module.exports = router
