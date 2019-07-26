var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    
     userName: {
          type: String,
          required: true
     },

     email: {
          type: String,
          required: true
     },

     password: {
          type: String,
          required: true

     }
});     

let product = mongoose.model(
    'product',
     productSchema

)

module.exports = product