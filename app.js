require('dotenv').config();
let express = require("express");
let app = express();
let sequelize = require("./db");
let bodyParser = require('body-parser');

let User = require("./controllers/usercontroller")
let Movie = require("./controllers/moviescontroller")
let Show = require("./controllers/showscontroller")
sequelize.sync()

app.use(require("./middleware/headers"))

app.use(bodyParser.json());

app.use("/user", User)



app.use(require("./middleware/validate-session"))

app.use("/movie", Movie)

app.use("/show", Show)


app.listen(process.env.PORT, function(req, res){
    console.log(process.env.PORT)
})


//order matters here