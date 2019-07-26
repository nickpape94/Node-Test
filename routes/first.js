const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const product = require('../models/itemsModel')
const validator = require("../validator/validator");
const bcrypt = require("bcrypt");
// const isEmpty = require("../validator/is-empty");


const router = express.Router();




// @route GET first/
// @desc Tests default route
// @access Public
router.get("/username", (req, res) => {
        const errors = {};
        product.find({userName:req.body.userName})
                .then(items => {
                        if (!items) {
                                errors.noItems = "Not a valid username";
                                req.status(404).json(errors);
                        }
                })
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
        payload = {};
        const prod = new product({
                userName: req.body.userName,
                email: req.body.email,
                password: req.body.password
        }) 

         const response = validator.itemVal(prod)  
        if (response.isValid) {
          prod.save().then(() => res.send('complete')) 
          .catch((err) => res.send(err)) 
        }
        else {
                res.send(response.errors)
        }
        

        bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
            prod.password = hash;
            prod.save().then(item => res.json(item))
               .catch(err => console.log(err));
    });

    

});

        

});



        
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

router.delete("/delete1", (req, res) => {

        product.findById(req.body._id).then(item => {

        item
        .remove()
        .then(() => {
            res.json({success: true});
        })       
        .catch(err =>
                res.status(404).json({ itemnotfound: "No item found"})
        );
     });
});    



function objectcombiner(name, con) {
        const object = {
                userName: name,
                content: con
        }
        return object;
}
module.exports = router;

