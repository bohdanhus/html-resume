const { Sequelize } = require('sequelize');

module.exports = new Sequelize('db', 'sorat', 'Bioware3619', {
    host: 'localhost',
    dialect: 'postgres'
});