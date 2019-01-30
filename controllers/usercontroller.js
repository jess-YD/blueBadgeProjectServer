let express = require("express");
let router = express.Router();
let sequelize = require("../db");
let User = sequelize.import("../models/users");
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");

//up above are called variables


/** Register ***/
router.post("/create", function (req, res) { //ok to receive a post request
    let username = req.body.user.username;
    let password = req.body.user.password;
    //console.log(req.body)
    User.create({
        username: username,
        passwordhash: bcrypt.hashSync(password, 10),  //this means you will do 10 rounds of bycrpt.
    }).then(
        function createSuccess(user) {
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
            res.json({
                user: user,
                token: token,
                message: "Hello, there!",
            })
        },
        function createError(err) {
            res.send(500, err.message)
        }
    )
})

/*** Login *** */
router.post("/login", function (req, res) {
    User.findOne({ where: { username: req.body.user.username } })
    .then(
        function (user) {
            if (user) {
                bcrypt.compare(req.body.user.password, user.passwordhash, function (err, matches) {
                    if (matches) {
                        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
                        res.json({
                            user: user,
                            message: "",
                            sessionToken: token
                        })
                    } else {
                        res.status(502).send({ error: "Bogus, please provide some valid creds ." })
                    }
                })
            } else {
                res.status(500).send({ error: "You are not on here dude." })
            }
        },
        function (err) {
            res.status(501).send({ err: "This error is groddy to the max, don't know what happened, sorry!" })
        }
    )
})

module.exports = router