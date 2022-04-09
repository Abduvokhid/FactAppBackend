const router = require('express').Router()

router.use('/', require('./dashboard'))
router.use('/categories', require('./categories'))
router.use('/facts', require('./facts'))

module.exports = router
