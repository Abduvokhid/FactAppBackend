module.exports = () => {
  return (req, res, next) => {
    if (req.user) next()
    else return res.redirect('/admin/login')
  }
}
