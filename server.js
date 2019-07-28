const express = require("express");
const bodyParser = require("body-parser");
let mongoose = require("mongoose");

const login = require("./routes/login");
const item = require("./routes/item");
const app = express();


// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use("/login", login);
app.use("/item", item);


// Database connection
mongoose.connect('mongodb://localhost:27017/example', { useNewUrlParser: true}).then(
    () => {console.log("connection made")},
    (err) => { console.log(err)}
);


// Port
app.listen(5000, () => console.log(`server running on port 5000`));



