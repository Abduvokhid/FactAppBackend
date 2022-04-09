const express = require('express')
const checkPermission = require('../../middlewares/checkPermission')
const { User } = require('../../DAL')
const sha1 = require('sha1')

const router = express.Router()

router.get('/login', (req, res) => {
  if (req.user) res.redirect('/admin')
  const error = req.getFlash('error')
  res.render('login', { layout: false, error: error })
})

router.post('/login', async (req, res) => {
  if (req.user) res.redirect('/admin')
  const { email, password } = req.body
  const user = await User.findOne({ where: { email: email } })
  if (!user || user.password !== password) {
    res.setFlash('error', 'Noto\'g\'ri email yoki parol')
    return res.redirect('/admin/login')
  }

  const sid = sha1(`${user.id}-${Date.now()}`)

  await User.update({ session: sid }, { where: { id: user.id } })
  res.cookie('sid', sid)

  res.redirect('/admin')
})

router.post('/logout', checkPermission(), async (req, res) => {
  req.user.session = null
  await req.user.save()
  res.cookie('sid', undefined, { maxAge: 1 })
  // await User.update({ session: null }, { where: { id: req.user.id } })
  res.redirect('/admin/login')
})

router.get('/', checkPermission(), (req, res) => {
  res.render('dashboard/index')
})

module.exports = router
