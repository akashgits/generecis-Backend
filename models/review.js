const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const review = sequelize.define('review', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  rating: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },


});

module.exports = review;
