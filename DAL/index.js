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

db.User = require('./user')(sequelize)
db.Session = require('./session')(sequelize)
db.Category = require('./category')(sequelize)
db.Fact = require('./fact')(sequelize)
db.FactCategory = require('./fact_category')(sequelize)

db.Session.belongsTo(db.User, {
  as: 'user',
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

db.Fact.belongsToMany(db.Category, {
  through: db.FactCategory,
  foreignKey: 'fact_id',
  timestamps: false
})

db.Category.belongsToMany(db.Fact, {
  through: db.FactCategory,
  foreignKey: 'category_id',
  timestamps: false
})

module.exports = db
