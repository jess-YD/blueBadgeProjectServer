module.exports = function( sequelize, DataTypes) {
    return sequelize.define("shows", { //what I put is the name of my table in postgres
        showTitle: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        startYear: {
            type: DataTypes.INTEGER,
            notEmpty: true
        },
        endYear: {
            type: DataTypes.INTEGER,
            notEmpty: true
        },
        imageURL: {
            type: DataTypes.STRING,
            notEmpty: true
        }
    })
}
