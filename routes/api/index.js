const router = require('express').Router()

router.use('/facts', require('./facts'))

module.exports = router
