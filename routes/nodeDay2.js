//imports
const express = require('express');
const bodyParser = require("body-parser")

//setting up middleware
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//endpoints
app.get("/", (req, res) => {
res.send("Hello world from Express");    
});



app.post("/create/:id", (req, res) => {

    const requestId = request.body.id;

    var num1 = req.body.num1;
    var num2 = req.body.num2;
    var result = num1 + num2;

    res.send(`${result}`)
});

app.post("/create2", (req, res) => {

console.log(req.body);

    var nums = [];
    var num1 = req.body.num1;
    var num2 = req.body.num2;
    var num3 = req.body.num3;
    var num4 = req.body.num4;
    nums.push(num1);
    nums.push(num2);
    nums.push(num3);
    nums.push(num4);
    let result = nums.sort();

    res.send(`${result}`)


})

let nums = [];
app.post("/create3", (req, res) => {

        
        let a = nums.push(req.body.num);
        let result = nums.sort();
    
        res.send(`${result}`)
    
    
    });


app.put("/update/:id", (req, res) => {

    const requestId = request.body.id;

    let num = nums.
  
});


 



// const port = process.env.PORT || 5000;







app.listen(5000, () => console.log(`server running on port 5000`));