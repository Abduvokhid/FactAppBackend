const express = require('express')
const router = express.Router()

router.use('/api', require('./api'))
router.use('/admin', require('./admin'))
// router.get('/privacy', (req, res) => res.render('privacy', { layout: false }))
router.use((req, res) => {
  res.status(403).send()
})

module.exports = router
