const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let itemSchema = new Schema({
    item: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

let item = mongoose.model('Item', itemSchema);

module.exports = item;


