const express = require('express')
const router = express.Router()

router.use('/', require('./dashboard'))
router.use('/api', require('./api'))
router.use('/categories', require('./categories'))
router.use('/facts', require('./facts'))
router.get('/privacy', (req, res) => res.render('privacy', { layout: false }))

module.exports = router
