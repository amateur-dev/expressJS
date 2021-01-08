const {Sequelize}=require('sequelize');

const sequelize = require('../utils/database');

const OrderItem = sequelize.define('orderitem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: Sequelize.INTEGER,
    amount: Sequelize.INTEGER
});

module.exports = OrderItem;