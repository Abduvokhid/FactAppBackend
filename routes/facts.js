const express = require('express')
const factDAL = require('../DAL/fact')
const categoryDAL = require('../DAL/category')
const router = express.Router()

router.get('/', async (req, res) => {
  const facts = await factDAL.findAllFacts()
  const categories = await categoryDAL.getAllCategories()
  const error = req.cookies.error
  res.clearCookie('error', { maxAge: 0 })
  res.render('facts/index', { facts, categories, error })
})

router.post('/add', async (req, res) => {
  const { fact_text, fact_category } = req.body
  const category = await categoryDAL.getCategoryByID(fact_category)
  if (!category) {
    res.cookie('error', 'Tanlangan kategoriya mavjud emas. Sahifani yangilab qaytadan urinib ko\'ring.')
    return res.redirect('/facts')
  }
  await factDAL.createFact(fact_text, category._id)
  res.redirect('/facts')
})

router.post('/delete/:id', async (req, res) => {
  await factDAL.deleteFact(req.params.id)
  res.redirect('/facts')
})

module.exports = router
