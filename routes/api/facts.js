const router = require('express').Router()
const { Fact } = require('../../DAL')
const { Op } = require('sequelize')

router.get('/', async (req, res) => {

  const offset = parseInt(req.query.offset) || 0
  const limit = parseInt(req.query.limit) || 50

  const facts = await Fact.findAll({
    where: { id: { [Op.gt]: offset } },
    limit: limit,
    order: [['id', 'ASC']],
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
