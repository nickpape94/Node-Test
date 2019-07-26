const validator = require("validator");
const isEmpty = require("./is-empty");




exports.itemVal = function validateUsernameInput(router) {
let errors = {};


router.userName = !isEmpty(router.userName) ? router.userName : "";
router.password = !isEmpty(router.password) ? router.password : "";
// router.email = isEmail(router.email) ? router.email : "";

//login validation
if (validator.isEmpty(router.userName)) {
        errors.userName = "Username is required"
}


if (!validator.isEmail(router.email)) {
    errors.userName = "Not a valid email"
}

if (validator.isEmpty(router.password)) {
    errors.password = "Password is required"
}

return {
errors,
isValid: isEmpty(errors)

};
};
