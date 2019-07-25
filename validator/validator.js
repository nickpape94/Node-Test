const validator = require("validator");
const isEmpty = require("./is-empty");

//Task

//This task will make use of the to-do list project that you have been working on.
//Part 1
//You are required to validate the user-name field 
//that the user provides when they are trying to create an item.
//This field can now only include 
//alpha-numeric characters; special punctuation is not allowed.

exports.itemVal = function validateUsernameInput(router) {
let errors = {};
let reg = "^[a-zA-Z0-9]*$";


router.userName = !isEmpty(router.userName) ? router.userName : "";

//login validation
if (validator.isEmpty(router.userName)) {
        errors.userName = "Username is required"
}




if (!validator.matches(router.userName, reg)) {
    errors.userName = "username must only contain nums and letters"
}

return {
errors,
isValid: isEmpty(errors)

};
};
