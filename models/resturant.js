const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const user = sequelize.define('resturant', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  resturantName: Sequelize.STRING,


});

module.exports = user;
