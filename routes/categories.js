const express = require('express')
const categoryDAL = require('../DAL/category')
const factDAL = require('../DAL/fact')
const checkPermission = require('../middlewares/checkPermission')
const router = express.Router()

router.get('/', checkPermission(), async (req, res) => {
  const categories = await categoryDAL.getAllCategories()
  const error = req.cookies.error
  res.clearCookie('error', { maxAge: 0 })
  res.render('categories/index', { categories, error })
})

router.post('/add', checkPermission(), async (req, res) => {
  const name = req.body.category_name
  await categoryDAL.createCategory(name)
  res.redirect('/categories')
})

router.post('/delete/:id', checkPermission(), async (req, res) => {
  const facts = await factDAL.findFactByCategoryID(req.params.id)
  if (facts.length > 0) {
    res.cookie('error', 'Ushbu kategoriyaga ulangan faktlar bor. Avval ularni o\'chiring yoki kategoriyasini o\'zgartiring')
    return res.redirect('/categories')
  }
  await categoryDAL.deleteCategory(req.params.id)
  res.redirect('/categories')
})

module.exports = router
