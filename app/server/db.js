const sequelize = require('./sequelize');
const { DataTypes } = require('sequelize');

const Browser_tasks = sequelize.define('browser_tasks', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    done: { type: DataTypes.BOOLEAN, allowNull: false },
    due_date: { type: DataTypes.DATE },
    description: { type: DataTypes.STRING }
});

module.exports = {
    Browser_tasks
}