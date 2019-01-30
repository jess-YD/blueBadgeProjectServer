module.exports = function( sequelize, DataTypes) {
    return sequelize.define("movies", { //what I put is the name of my table in postgres
        movieTitle: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        releaseYear: {
            type: DataTypes.INTEGER,
            notEmpty: true
        },
        imageURL: {
            type: DataTypes.STRING,
            notEmpty: true
        }
    })
}