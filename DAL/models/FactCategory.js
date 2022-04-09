const { DataTypes } = require('sequelize')

module.exports = (sequelize) => sequelize.define('fact_category', {
  fact_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'facts',
      key: 'id'
    },
    onDelete: 'cascade',
  },
  category_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'categories',
      key: 'id'
    },
    onDelete: 'cascade',
  },
}, {
  timestamps: false,
})
