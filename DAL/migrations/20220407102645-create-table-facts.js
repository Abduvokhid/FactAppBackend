const { DataTypes } = require('sequelize')

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable('facts', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    }, {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    })
  },

  async down (queryInterface) {
    await queryInterface.dropTable('facts')
  }
}
