const validator = require("validator");
const isEmpty = require("./is-empty");

exports.validateItemInput = function (data) {

    let errors = {};

    data.item = !isEmpty(data.item) ? data.item : "";
    data.content = !isEmpty(data.content) ? data.content : "";

    if (validator.isEmpty(data.item)) {
        errors.item = "Item field required";
    }

    if (validator.isEmpty(data.content)) {
        errors.content = "Content field required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

};