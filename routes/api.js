const express = require('express')
const factsDAL = require('../DAL/fact')
const router = express.Router()

router.get('/facts', async (req, res) => {
  const facts = await factsDAL.findAllFacts()
  for (const fact of facts) {
    fact._id = undefined
    fact.created_date = undefined
    fact.category = fact.category.name
  }
  res.json({
    count: facts.length,
    result: facts
  })
})

module.exports = router
