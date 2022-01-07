const express = require('express')
const router = express.Router()

router.use('/', require('./dashboard'))
router.use('/api', require('./api'))
router.use('/categories', require('./categories'))
router.use('/facts', require('./facts'))

module.exports = router
