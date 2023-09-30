const sequelize = require("./connection");

// ----------------------------------------------------------
const cards_model = require("./models/cards");
// ----------------------------------------------------------

sequelize.define("cards",cards_model,{
    timestamps : false,
    freezeTableName : true
}).sync({ alter : true});


class DataBase {
    constructor() {
        this.models = sequelize.models;
    }
}

module.exports = DataBase;