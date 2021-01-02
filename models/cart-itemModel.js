const {Sequelize}=require('sequelize');

const sequelize = require('../utils/database');

const CartItem = sequelize.define('cartitem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = CartItem;