const express = require('express')
const categoryDAL = require('../DAL/category')
const factDAL = require('../DAL/fact')
const router = express.Router()

router.get('/', async (req, res) => {
  const categories = await categoryDAL.getAllCategories()
  const error = req.cookies.error
  res.clearCookie('error', { maxAge: 0 })
  res.render('categories/index', { categories, error })
})

router.post('/add', async (req, res) => {
  const name = req.body.category_name
  await categoryDAL.createCategory(name)
  res.redirect('/categories')
})

router.post('/delete/:id', async (req, res) => {
  const facts = await factDAL.findFactByCategoryID(req.params.id)
  if (facts.length > 0) {
    res.cookie('error', 'Ushbu kategoriyaga ulangan faktlar bor. Avval ularni o\'chiring yoki kategoriyasini o\'zgartiring')
    return res.redirect('/categories')
  }
  await categoryDAL.deleteCategory(req.params.id)
  res.redirect('/categories')
})

module.exports = router
