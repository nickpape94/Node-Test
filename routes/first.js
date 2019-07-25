const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const product = require('../models/itemsModel')
const validator = require("../validator/validator");
// const isEmpty = require("../validator/is-empty");


const router = express.Router();
const arrayList = ["Kevin sorbo", "Kevin Cosner"];


// @route GET first/test
// @desc Tests first route
// @access Public
router.get("/test", (req, res) => {
        res.send(arrayList);
});

// @route GET first/
// @desc Tests default route
// @access Public
router.get("/", (req, res) => {
        res.json({ message: "Default First" })
});

// @route   GET item/all
// @desc    Get all items
// @access  Public
router.get("/all", (req, res) => {
        const errors = {};
        product.find()
          .then(items => {
            if (!items) {
              errors.noItems = "There are no items";
              res.status(404).json(errors);
            }
            res.json(items);
          })
          .catch(err => res.status(404).json({ noItems: "There are no items" }));
      });

      


// @route   POST item/all
// @desc    POST an item
// @access  Public      
router.post("/create", (req, res) => {

        const prod = new product({
                userName: req.body.userName,
                content: req.body.content
        }) 
        
        const response = validator.itemVal(prod)  
        if (response.isValid) {
          prod.save().then(() => res.send('complete')) 
          .catch((err) => res.send(err)) 
        }
        else {
                res.send(response.errors)
        }
     

})







router.put("/update", (req, res) => {

        let name = req.body.userName;
        let con = req.body.content;
        let combined = objectcombiner(name, con);

        _.set(arrayList, 0, combined);
        res.send(200, arrayList);

});



router.delete("/delete", (req, res) => {

        _.pullAt(arrayList, 0);
        res.send(200, arrayList);
        prod.delete.then(() => res.delete('deleted')),
        (err) => res.send(err);

});



function objectcombiner(name, con) {
        const object = {
                userName: name,
                content: con
        }
        return object;
}
module.exports = router;

