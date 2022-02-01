require('dotenv').config()
require('express-async-errors')
require('./utils/prototypes')

const app = require('express')()
const db = require('./DAL')
const errorHandler = require('./utils/errorHandler')

app.use(require('./middlewares'))
app.use(require('./routes'))

// region Error handlers
app.use((err, req, res, _) => {
  errorHandler(err, res)
})

process.on('uncaughtException', error => {
  error.message = 'Something went wrong'
  errorHandler(error)
})

process.on('unhandledRejection', (reason) => {
  reason.message = 'Something went wrong'
  errorHandler(reason)
})
// endregion

const PORT = process.env.PORT || 5000
app.listen(PORT, async () => {
  console.log(`Server started on port ${PORT}`)
  db.sequelize.sync().then(() => {
    console.log('Database has been connected')
  })
})
