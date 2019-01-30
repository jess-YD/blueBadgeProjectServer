let express = require("express");
let router = express.Router();
let sequelize = require("../db");
let Movie = sequelize.import("../models/movies");
let Show = sequelize.import("../models/shows");


//up above are called variables


/****Shows ******* */
router.post("/make", function (req, res) { //ok to receive a post request. On post you can create or send data to server
    let showTitle = req.body.show.showTitle;
    let startYear= req.body.show.startYear;
    let endYear= req.body.show.endYear;
    let imageURL = req.body.show.imageURL;
    //console.log(req.body)
    Show.create({
        showTitle: showTitle,
        startYear: startYear,
        endYear: endYear,
        imageURL: imageURL
    }).then(
        function createSuccess(show) {
            res.json({
                created: show,
                message: "Hello, there!",
            })
        },
        function createError(err) {
            res.send(500, err.message)
        }
    )
})

router.get("/totallybuggin", function (req, res) { //this is where I would allow to all users see the shows that another user uploaded. It's open. On "get" we can read the shows
    console.log(req.user.dataValues.id)
    Show.findAll()
    .then( //.then passes any info found to the 1st function if found or 2nd function if there is an error
        function getSuccess(sweeteightiesflixs) {  //if it can be found in the database then its a success
            res.json({
                show: sweeteightiesflixs,
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
    let showTitle = req.body.show.showTitle;
    let startYear= req.body.show.startYear;
    let endYear= req.body.show.endYear;
    let imageURL = req.body.show.imageURL;
    //console.log(req.body)
    Show.update({
        showTitle: showTitle,
        startYear: startYear,
        endYear: endYear,
        imageURL: imageURL
    }, { where: { id: input }}) //update the show with the up above info which id is = to the input
    .then(
        function createSuccess(show) {
            res.json({
                updated: show,
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
    Show.destroy({ where: { id: input }}) //delete the show with the up above info which id is = to the input
    .then(
        function createSuccess(show) {
            res.json({
                updated: show,
                message: "Hello, there!",
            })
        },
        function createError(err) {
            res.send(500, err.message)
        }
    )
})

module.exports = router