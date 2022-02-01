const express = require('express')
const { User, Category, FactCategory, Fact } = require('../DAL')
const { Op } = require('sequelize')
const router = express.Router()

router.get('/test', async (req, res) => {
  const d = ['732648539233026049', '732648557113442305']
  const data = await Category.findAll({ where: { id: { [Op.in]: d } }, attributes: ['id'] })
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
