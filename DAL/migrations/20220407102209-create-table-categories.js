const { DataTypes } = require('sequelize')

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable('categories', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }, {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    })
  },

  async down (queryInterface) {
    await queryInterface.dropTable('categories')
  }
}
