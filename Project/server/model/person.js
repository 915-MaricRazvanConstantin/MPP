const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Person = sequelize.define('Person', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Person;