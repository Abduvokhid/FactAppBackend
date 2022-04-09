const { DataTypes } = require('sequelize')

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable('fact_categories', {
      fact_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'facts',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id',
        },
        onDelete: 'cascade',
      },
    }, {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    })
  },

  async down (queryInterface) {
    await queryInterface.dropTable('fact_categories')
  }
}
