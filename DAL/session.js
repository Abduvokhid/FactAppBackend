const { DataTypes } = require('sequelize')

module.exports = (sequelize) => sequelize.define('session', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  sid: {
    type: DataTypes.STRING
  },
  expires: {
    type: DataTypes.DATE
  },
  user_agent: {
    type: DataTypes.TEXT
  },
  created_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false
})
