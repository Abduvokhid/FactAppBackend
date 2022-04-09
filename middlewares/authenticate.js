const { User } = require('../DAL')

module.exports = async (req, res, next) => {
  const sid = req.cookies.sid
  if (!sid) return next()

  const user = await User.findOne({ session: sid })
  if (!user) return next()

  req.user = user
  res.locals.user = user

  req.user_agent = req.get('User-Agent')

  next()
}
