module.exports = function( sequelize, DataTypes) {
    return sequelize.define("user", { //what I put is the name of my table in postgres
        username: {
            type: DataTypes.STRING,
            notEmpty: true,
            unique: true
        },
        passwordhash: {
            type: DataTypes.STRING,
            notEmpty: true
        }
    })
}