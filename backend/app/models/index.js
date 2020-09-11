const config = require('../config/db.config');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,
});

const db = {};

// db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.polygon = require("./polygon.model")(sequelize, DataTypes);
db.line = require("./line.model")(sequelize, DataTypes);
db.point = require("./point.model")(sequelize, DataTypes);

module.exports = db;

// async function testConnection() {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// }
