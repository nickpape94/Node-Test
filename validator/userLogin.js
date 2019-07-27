const validator = require("validator");
const isEmpty = require("./is-empty");




function validateUserInput(data) {
const errors = {};


data.userName = !isEmpty(data.userName) ? data.userName : "";
data.email = !isEmpty(data.email) ? data.email : "";
data.password = !isEmpty(data.password) ? data.password : "";
data.passwordRepeat = !isEmpty(data.passwordRepeat) ? data.passwordRepeat : "";

//username validation

if (!validator.isAlphanumeric(data.userName)) {
    errors.userName = "Username must be alphanumeric";
}

if (validator.isEmpty(data.userName)) {
    errors.userName = "Please enter a username";
}



//email validation
if (validator.isEmpty(data.email)) {
        errors.email = "Email is required";
}


if (!validator.isEmail(data.email)) {
    errors.email = "Not a valid email";
}

//password validation
if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
}


if (!validator.equals(data.password, data.passwordRepeat)) {
    errors.password = "Passwords don't match";
    
}






return {
errors,
isValid: isEmpty(errors)

};
}

module.exports = validateUserInput;
