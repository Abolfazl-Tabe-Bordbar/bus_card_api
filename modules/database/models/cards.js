const { DataTypes } = require("sequelize");

const cards = {
    code : {
        type : DataTypes.INTEGER,
        allowNull : false,
    },
    charge : {
        type : DataTypes.INTEGER,
        allowNull : false,
    },
}

module.exports = cards;