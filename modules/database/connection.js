const { Sequelize } = require('sequelize');
const {database_name, database_username, database_password} = require("../../global_config");
let connection_database_status = false
const sequelize = new Sequelize(database_name, database_username , database_password, {
    host: 'localhost',
    dialect: 'postgres'
});

async function start() {
    try {
        await sequelize.authenticate();
        connection_database_status = true;
    } catch (error) {
        connection_database_status = false;
    }
}
start()
module.exports = sequelize , connection_database_status;