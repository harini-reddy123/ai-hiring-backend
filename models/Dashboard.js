const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db dash'); 

const DashboardStats = sequelize.define('DashboardStats', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  totalUsers: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  totalRevenue: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0
  },
  activeOrders: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  timestamps: true
});

module.exports = DashboardStats;