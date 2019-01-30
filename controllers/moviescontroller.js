let express = require("express");
let router = express.Router();
let sequelize = require("../db");
let Movie = sequelize.import("../models/movies");


//up above are called variables


/****Movies ******* */
router.post("/make", function (req, res) { //ok to receive a post request. On post you can create or send data to server
    let movieTitle = req.body.movie.movieTitle;
    let releaseYear= req.body.movie.releaseYear;
    let imageURL = req.body.movie.imageURL;
    //console.log(req.body)
    Movie.create({
        movieTitle: movieTitle,
        releaseYear: releaseYear,
        imageURL: imageURL
    }).then(
        function createSuccess(movie) {
            res.json({
                created: movie,
                message: "Hello, there!",
            })
        },
        function createError(err) {
            res.send(500, err.message)
        }
    )
})

router.get("/totallybuggin", function (req, res) { //this is where I would allow to all users see the movies that another user uploaded. It's open. On "get" we can read the movies
console.log(req.user.dataValues.id)
console.log("kjhgfdcvbnkjuytrfdcvbnmkJHGFDSDFGHJKJHGFDFGHJKJHGFRERTYUIJUHYGFDFGHJKLKJHG")
Movie.findAll()
    .then( //.then passes any info found to the 1st function if found or 2nd function if there is an error
        function getSuccess(sweeteightiesflixs) {  //if it can be found in the database then its a success
            res.json({
                movie: sweeteightiesflixs,
                message: "Hello, there!",
            })
        },
        function createError(err) { //will return with an error if it cant be found in the database
            res.send(500, err.message)
        }
    )
})

router.put("/rollingwiththehomies/:id", function (req, res) {
    let input = req.params.id;
    let movieTitle = req.body.movie.movieTitle;
    let releaseYear= req.body.movie.releaseYear;
    let imageURL = req.body.movie.imageURL;
    //console.log(req.body)
    Movie.update({
        movieTitle: movieTitle,
        releaseYear: releaseYear,
        imageURL: imageURL
    }, { where: { id: input }}) //update the movie with the up above info which id is = to the input
    .then(
        function createSuccess(movie) {
            res.json({
                updated: movie,
                message: "Hello, there!",
            })
        },
        function createError(err) {
            res.send(500, err.message)
        }
    )
})

router.delete("/barfout/:id", function (req, res) {
    let input = req.params.id;
    Movie.destroy({ where: { id: input }}) //delete the movie with the up above info which id is = to the input
    .then(
        function createSuccess(movie) {
            res.json({
                updated: movie,
                message: "Hello, there!",
            })
        },
        function createError(err) {
            res.send(500, err.message)
        }
    )
})

module.exports = router