const express = require('express')
const { Fact } = require('../DAL')
const { Op } = require('sequelize')
const router = express.Router()

router.get('/facts', async (req, res) => {
  let { last_id } = req.query
  if (last_id) last_id = new Date(parseInt(last_id))
  const facts = last_id ? await Fact.findAll({ where: { id: { [Op.gt]: last_id } } }) : await Fact.findAll()
  for (const fact of facts) {
    fact.id = undefined
    fact.created_date = undefined
    fact.category = fact.category.name
  }
  res.json({
    count: facts.length,
    result: facts
  })
})

module.exports = router
