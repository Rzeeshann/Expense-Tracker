const Sequelize  = require('sequelize')

const sequelize = require('../Util/database')

const Expense = sequelize.define('expenses', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    Amount:{
        type: Sequelize.STRING,
    },

    Description:{
        type: Sequelize.STRING,
    },

    Category: {
        type:Sequelize.STRING
    }

})

module.exports= Expense;