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

// @route   GET login/all
// @desc    Login to account with credentials
// @access  Public
router.get("/login", (req, res) => {
        const errors = {};

        const search = { userName: req.body.userName };
        
        Login.findOne(search).then(user => {
             if (!user) {
                 errors.noUser = "This username does not exist";
                 res.status(404).json(errors);    
             } 
             
             bcrypt.compare(req.body.password, user.password)
                .then(isMatch => {
                  if (isMatch) {      
                        res.send(success);
                } else {
                        errors.password = "Invalid password"
                        res.status(404).send(errors);
                }
        }).catch(err => res.status(404).send(err));

        }).catch(err => res.status(404).send(err));
          
          
      });

      


// @route   POST user/user create
// @desc    POST a user
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
        
        const searchUser = { userName: req.body.userName };
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



//Get all utilise donly to test application
router.get("/getAll", (req, res) => {
        const errors = {};
        Login.find().then(items => {
                if(!items) {
                        errors.noItems = "There are no users";
                        res.status(404).json(errors);
                }
                res.json(items);
        }).catch(err => res.status(404).json({noUser: "There are no users"}));
        });




function objectcombiner(name, con) {
        const object = {
                userName: name,
                content: con
        }
        return object;
}
module.exports = router;
