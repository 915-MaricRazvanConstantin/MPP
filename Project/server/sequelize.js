const { Sequelize } = require('sequelize');

// Define custom logging function
function myCustomLogger(message) {
    console.log(message);
}

// Initialize Sequelize instance
const sequelize = new Sequelize({
    username: 'maric',
    password: 'database',
    database: 'MPPDataBase',
    host: 'localhost',
    dialect: 'mysql',
    logging: myCustomLogger // Pass custom logging function
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

module.exports = sequelize;