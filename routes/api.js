const express = require('express')
const factsDAL = require('../DAL/fact')
const router = express.Router()

router.get('/facts', async (req, res) => {
  let { last_access } = req.query
  if (last_access) last_access = new Date(parseInt(last_access))
  const facts = last_access ? await factsDAL.findFactsAfterDate(last_access) : await factsDAL.findAllFacts()
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
