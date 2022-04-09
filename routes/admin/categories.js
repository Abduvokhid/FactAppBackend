const express = require('express')
const { Category, FactCategory } = require('../../DAL')
const checkPermission = require('../../middlewares/checkPermission')
const router = express.Router()

router.get('/', checkPermission(), async (req, res) => {
  const categories = await Category.findAll()
  // console.log(categories)
  const error = req.cookies.error
  res.clearCookie('error', { maxAge: 0 })
  res.render('categories/index', { categories, error })
})

router.post('/add', checkPermission(), async (req, res) => {
  const name = req.body.category_name
  await Category.create({ name })
  res.redirect('/admin/categories')
})

router.post('/delete/:id', checkPermission(), async (req, res) => {
  const { count } = await FactCategory.findAndCountAll({ where: { category_id: req.params.id } })
  if (count > 0) {
    res.cookie('error', 'Ushbu kategoriyaga ulangan faktlar bor. Avval ularni o\'chiring yoki kategoriyasini o\'zgartiring')
    return res.redirect('/admin/categories')
  }
  await Category.destroy(req.params.id)
  res.redirect('/admin/categories')
})

module.exports = router
