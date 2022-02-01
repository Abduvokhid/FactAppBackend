const express = require('express')
const { User, Category, FactCategory, Fact } = require('../DAL')
const { Op } = require('sequelize')
const router = express.Router()

router.get('/test', async (req, res) => {
  const { count: users_count, rows: users } = await User.findAndCountAll()
  const { count: facts_count, rows: facts } = await Fact.findAndCountAll()
  const { count: categories_count, rows: categories } = await Category.findAndCountAll()

  const last_month = new Date()
  last_month.setDate(last_month.getDate() - 30)
  const last_week = new Date()
  last_week.setDate(last_week.getDate() - 7)
  const last_day = new Date()
  last_day.setDate(last_day.getDate() - 1)

  const data = {
    users: {
      total: users_count,
      last_month: (users.filter(item => item.created_date > last_month)).length,
      last_week: (users.filter(item => item.created_date > last_week)).length,
      last_day: (users.filter(item => item.created_date > last_day)).length,
    },
    facts: {
      total: facts_count,
      last_month: (facts.filter(item => item.created_date > last_month)).length,
      last_week: (facts.filter(item => item.created_date > last_week)).length,
      last_day: (facts.filter(item => item.created_date > last_day)).length,
    },
    categories: {
      total: categories_count,
      last_month: (categories.filter(item => item.created_date > last_month)).length,
      last_week: (categories.filter(item => item.created_date > last_week)).length,
      last_day: (categories.filter(item => item.created_date > last_day)).length,
    }
  }

  res.json(data)
})

router.get('/test/:id', async (req, res) => {
  const data = await FactCategory.findAndCountAll({ where: { category_id: req.params.id } })
  res.json(data)
})

router.use('/', require('./dashboard'))
router.use('/api', require('./api'))
router.use('/categories', require('./categories'))
router.use('/facts', require('./facts'))
router.get('/privacy', (req, res) => res.render('privacy', { layout: false }))

module.exports = router
