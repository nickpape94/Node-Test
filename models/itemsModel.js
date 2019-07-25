var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    userName: String,
    content: String,
    
});

let product = mongoose.model(
    'product',
     productSchema

)

module.exports = product