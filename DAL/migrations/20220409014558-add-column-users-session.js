const { DataTypes } = require('sequelize')

module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn('users', 'session', {
      type: DataTypes.STRING,
    })
  },

  async down (queryInterface) {
    await queryInterface.removeColumn('users', 'session')
  }
}
