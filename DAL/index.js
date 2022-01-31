const { Sequelize } = require('sequelize')
const sequelize = new Sequelize(process.env.DB_URI, {
  dialect: 'postgres',
  charset: 'utf8',
  collate: 'utf8_general_ci',
  logging: false
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require('./user')(sequelize)
db.session = require('./session')(sequelize)
db.category = require('./category')(sequelize)
db.fact = require('./fact')(sequelize)

db.session.belongsTo(db.user, {
  as: 'user',
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

db.fact.belongsToMany(db.category, {
  through: 'facts_categories',
  constraints: false,
})

module.exports = db
