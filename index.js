require('dotenv').config()

const app = require('express')()

app.use(require('./middlewares'))
app.use(require('./routes'))

const PORT = process.env.PORT || 5000
app.listen(PORT, async () => {
  console.log(`Server started on port ${PORT}`)
  await require('./DAL')()
})
