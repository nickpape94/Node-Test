const validator = require("validator");
const isEmpty = require("./is-empty");




exports.itemVal = function validateUserInput(router) {
let errors = {};


router.userName = !isEmpty(router.userName) ? router.userName : "";
router.email = !isEmpty(router.email) ? router.email : "";
router.password = !isEmpty(router.password) ? router.password : "";
router.passwordRepeat = !isEmpty(router.passwordRepeat) ? router.passwordRepeat : "";




//email validation
if (validator.isEmpty(router.email)) {
        errors.email = "Email is required"
}


if (!validator.isEmail(router.email)) {
    errors.email = "Not a valid email"
}

//password validation
if (validator.isEmpty(router.password)) {
    errors.password = "Password is required"
}


if (!validator.equals(router.password, router.passwordRepeat)) {
    errors.password = "Passwords don't match"
    
}

//username validation

if (!validator.isAlphanumeric(router.userName)) {
    errors.userName = "Username must be alphanumeric"
}

if (validator.isEmpty(router.userName)) {
    errors.userName = "Please enter a username"
}





return {
errors,
isValid: isEmpty(errors)

};
};
