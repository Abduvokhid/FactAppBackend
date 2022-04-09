const { Sequelize } = require('sequelize')
const associate = require('./associations')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  charset: 'utf8',
  collate: 'utf8_general_ci',
  logging: false,
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.User = require('./models/User')(sequelize)
db.Category = require('./models/Category')(sequelize)
db.Fact = require('./models/Fact')(sequelize)
db.FactCategory = require('./models/FactCategory')(sequelize)

associate(db)

module.exports = db
