const router = require('express').Router()
const { Fact } = require('../../DAL')

router.get('/', async (req, res) => {
  const { offset = 0, limit = 50 } = req.query
  const facts = await Fact.findAll({
    include: {
      association: 'categories',
      through: { attributes: [] },
      where: { id: { $gt: offset } },
      limit: limit,
    }
  })
  res.json({
    ok: true,
    result: facts,
  })
})

module.exports = router
