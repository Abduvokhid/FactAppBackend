const express = require('express')
const checkPermission = require('../middlewares/checkPermission')
const userDAL = require('../DAL/user')

const router = express.Router()

router.get('/login', (req, res) => {
  if (req.user) res.redirect('/')
  const error = req.cookies.error
  res.clearCookie('error', { maxAge: 0 })
  res.render('login', { layout: false, error: error })
})

router.post('/login', async (req, res) => {
  if (req.user) res.redirect('/')
  const { email, password } = req.body
  const user = await userDAL.getUserByEmail(email)
  if (!user || user.password !== password) {
    res.cookie('error', 'Noto\'g\'ri email yoki parol')
    return res.redirect('/login')
  }
  req.session.user = user._id
  res.redirect('/')
})

router.post('/logout', checkPermission(), async (req, res) => {
  await req.session.destroy()
  res.redirect('/login')
})

router.get('/', checkPermission(), (req, res) => {
  res.render('dashboard/index')
})

module.exports = router
