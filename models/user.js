const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const user = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  phonenumber: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },

});

module.exports = user;
