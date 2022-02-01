const { Session } = require('../DAL')

module.exports = async (req, res, next) => {
  const sid = req.cookies.sid
  if (!sid) return next()

  const session = await Session.findOne({ include: 'user', where: { sid: sid } })
  if (!session) return next()
  if (!session.user) return next()

  req.session = session
  req.user = session.user
  res.locals.user = session.user

  req.session.user_agent = req.get('User-Agent')

  next()
}
