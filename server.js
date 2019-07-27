const express = require("express");
const bodyParser = require("body-parser");
let mongoose = require("mongoose");

const login = require("./routes/login");
const app = express();



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/login", login);



mongoose.connect('mongodb://localhost:27017/example', { useNewUrlParser: true}).then(
    () => {console.log("connection made")},
    (err) => { console.log(err)}
);



app.listen(5000, () => console.log(`server running on port 5000`));



