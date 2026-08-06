const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(
  'dashboard_db',   
  'root',           
  'Harini@12345',   
  {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Database Connected Successfully!');
  } catch (error) {
    console.error('Database connection failed:', error.message);
  }
};

module.exports = { sequelize, connectDB };