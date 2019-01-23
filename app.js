require('dotenv').config();
let express = require("express");
let app = express();
let sequelize = require("./db");
let bodyParser = require('body-parser');

let User = require("./controllers/usercontroller")

sequelize.sync()

app.use(bodyParser.json());

app.use("/user", User)


app.listen(process.env.PORT, function(req, res){
    console.log(process.env.PORT)
})
