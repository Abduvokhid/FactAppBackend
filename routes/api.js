const express = require('express')
const { Fact, Category } = require('../DAL')
const { Op } = require('sequelize')
const router = express.Router()

router.get('/facts', async (req, res) => {
  let { last_id } = req.query
  const options = {
    attributes: { exclude: ['created_date'] },
    include: {
      model: Category,
      through: { attributes: [] },
      attributes: { exclude: ['created_date'] },
    },
    distinct: true
  }
  const { rows: facts, count } = last_id ? await Fact.findAndCountAll({ where: { id: { [Op.gt]: last_id } }, ...options }) : await Fact.findAndCountAll(options)
  res.json({
    count: count,
    result: facts
  })
})

module.exports = router
