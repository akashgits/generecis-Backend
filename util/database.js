const Sequelize = require('sequelize');

const sequelize = new Sequelize('douts', 'root', 'Mysql@123', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
