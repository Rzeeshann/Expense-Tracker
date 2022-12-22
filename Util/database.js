const Sequelize = require('sequelize');

const sequelize = new Sequelize('expense', 'root', 'zeeshansk', {
  dialect: 'mysql',
  host: 'localhost',

});

module.exports = sequelize;
