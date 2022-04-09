module.exports = associations = (db) => {

  db.Fact.belongsToMany(db.Category, {
    through: db.FactCategory,
    foreignKey: 'fact_id',
    otherKey: 'category_id',
  })

  db.Category.belongsToMany(db.Fact, {
    through: db.FactCategory,
    foreignKey: 'category_id',
    otherKey: 'fact_id',
  })

}
