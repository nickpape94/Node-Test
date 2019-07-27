const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const Login = require("../models/loginModel");
const validateUserInput = require("../validator/userLogin");
const bcrypt = require("bcrypt");
// const isEmpty = require("../validator/is-empty");


const router = express.Router();




// @route GET user/
// @desc Get a user
// @access Public
router.get("/getAUser", (req, res) => {
        const errors = {};
        
        Login.findOne({userName})
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
router.post("/addAUser", (req, res) => {
        const errors = {};
        const validate = validateUserInput(req.body)

        if (!validate.isValid) {
                return res.status(404).send(validate.errors)
        }

        const newUser = new Login({
                userName: req.body.userName,
                email: req.body.email,
                password: req.body.password
                
        })
        
        const searchUser = { userName: req.body.username };
        const searchEmail = { email: req.body.email };

         
        Login.findOne(searchEmail)
            .then(user => {
                if (!user) {
                    Login.findOne(searchUser).then(user => {
                         if (!user) {
                             bcrypt.genSalt(10, (err, salt) => {
                                  bcrypt.hash(newUser.password, salt, (err, hash) => {
                                          if (err) {
                                                  res.status(404).send(err)
                                          } else {
                                                  newUser.password = hash;
                                                  newUser.save().then(() =>res.send(success)).catch(err => res.status(404).send(err));
                                          }
                                  })   
                             });
                         } else {
                                 errors.userName = "username taken";
                                 res.status(404).send(errors);
                         }  
                    }).catch(err => res.status(404).send(err));    
                } else {
                        errors.email = "email taken";
                        res.status(404).send(errors);
                }
            }).catch(err => res.status(404).send(err));

        



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
