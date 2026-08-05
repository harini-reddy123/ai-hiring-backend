const { Sequelize } = require('sequelize');
const path = require('path');

// Strictly load .env from root directory path
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Console log for testing env variables loading
console.log("DB Username:", process.env.DB_USER || 'root');
console.log("DB Host:", process.env.DB_HOST || 'localhost');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'dashboard_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '', // Blank if no password
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Database Connected Successfully!');
  } catch (error) {
    console.error('Unable to connect to MySQL database:', error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };