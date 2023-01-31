const  Sequelize  = require("sequelize");

const sequelize=require('../util/database')

const Orders = sequelize.define('Orders', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    productId:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    title: Sequelize.STRING,
    price: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: false
    },
    quantity:{
      type:Sequelize.INTEGER,
      allowNull:false
    },
    Total:{
        type:Sequelize.INTEGER,
        allowNull:false
      }
  });
  
  module.exports = Orders;
  
