const express = require('express')
const checkPermission = require('../middlewares/checkPermission')
const { User, Session } = require('../DAL')
const sha1 = require('sha1')

const router = express.Router()

router.get('/login', (req, res) => {
  if (req.user) res.redirect('/')
  const error = req.getFlash('error')
  res.render('login', { layout: false, error: error })
})

router.post('/login', async (req, res) => {
  if (req.user) res.redirect('/')
  const { email, password } = req.body
  const user = await User.findOne({ where: { email: email } })
  if (!user || user.password !== password) {
    res.setFlash('error', 'Noto\'g\'ri email yoki parol')
    return res.redirect('/login')
  }

  const sid = sha1(`${user.id}-${Date.now()}`)

  await Session.create({
    sid: sid,
    expires: new Date(Date.now() + (24 * 60 * 60 * 1000)),
    user_id: user.id,
    user_agent: req.user_agent
  })
  res.cookie('sid', sid)

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
