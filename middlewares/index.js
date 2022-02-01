const express = require('express')
const cookieParser = require('cookie-parser')
const expressLayouts = require('express-ejs-layouts')
const nl2br = require('nl2br')
const flash = require('./flash')
const authenticate = require('./authenticate')

const router = express.Router()

router.use((req, res, next) => {
  req.app.set('view engine', 'ejs')
  req.app.locals.path = req.path
  res.locals.path = req.path
  res.locals.nl2br = nl2br
  next()
})

router.use(expressLayouts)
router.use(express.static('public'))
router.use(express.urlencoded({ extended: false }))
router.use(cookieParser(process.env.COOKIE_SECRET))

router.use(flash)
router.use(authenticate)

// router.use((req, res, next) => {
//   res.locals.selector = require('../helpers/selector')
//   next()
// })

module.exports = router
