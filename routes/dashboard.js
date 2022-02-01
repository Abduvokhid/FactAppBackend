const express = require('express')
const checkPermission = require('../middlewares/checkPermission')
const { User, Session, Fact, Category } = require('../DAL')
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
    req.setFlash('error', 'Noto\'g\'ri email yoki parol')
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

router.get('/', checkPermission(), async (req, res) => {
  const { count: users_count, rows: users } = await User.findAndCountAll()
  const { count: facts_count, rows: facts } = await Fact.findAndCountAll()
  const { count: categories_count, rows: categories } = await Category.findAndCountAll()

  const last_month = new Date()
  last_month.setDate(last_month.getDate() - 30)
  const last_week = new Date()
  last_week.setDate(last_week.getDate() - 7)
  const last_day = new Date()
  last_day.setDate(last_day.getDate() - 1)

  const data = {
    users: {
      total: users_count,
      last_month: (users.filter(item => item.created_date > last_month)).length,
      last_week: (users.filter(item => item.created_date > last_week)).length,
      last_day: (users.filter(item => item.created_date > last_day)).length,
    },
    facts: {
      total: facts_count,
      last_month: (facts.filter(item => item.created_date > last_month)).length,
      last_week: (facts.filter(item => item.created_date > last_week)).length,
      last_day: (facts.filter(item => item.created_date > last_day)).length,
    },
    categories: {
      total: categories_count,
      last_month: (categories.filter(item => item.created_date > last_month)).length,
      last_week: (categories.filter(item => item.created_date > last_week)).length,
      last_day: (categories.filter(item => item.created_date > last_day)).length,
    }
  }
  console.log(data)
  res.render('dashboard/index', { data })
})

module.exports = router
