const express = require('express')
const cookieParser = require('cookie-parser')
const expressLayouts = require('express-ejs-layouts')
const nl2br = require('nl2br')
const flash = require('./flash')
const authenticate = require('./authenticate')

const router = express.Router()

router.use([
  express.static('public'),
])

router.use('/admin', [
  (req, res, next) => {
    req.app.set('view engine', 'ejs')
    req.app.locals.path = req.path
    res.locals.path = req.path
    res.locals.nl2br = nl2br
    next()
  },
  expressLayouts,
  express.urlencoded({ extended: false }),
  cookieParser(process.env.COOKIE_SECRET),
  flash,
  authenticate,
])

router.use('/api', [
  (req, res, next) => {
    req.app.set('json replacer', (k, v) => (v === null ? undefined : v))
    next()
  },
  express.json(),
])

module.exports = router
