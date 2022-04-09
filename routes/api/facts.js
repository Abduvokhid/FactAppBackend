const router = require('express').Router()
const { Fact } = require('../../DAL')

router.get('/', async (req, res) => {
  const facts = await Fact.findAll({
    include: {
      association: 'categories',
      through: { attributes: [] },
    }
  })
  res.json({
    ok: true,
    result: facts,
  })
})

module.exports = router
