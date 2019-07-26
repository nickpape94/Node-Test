var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    
     userName: {
          type: String,
          required: true
     },

     email: {
          type: String,
          required: true,
          match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
     },

     password: {
          type: String,
          required: true

     },

     passwordRepeat: {
          type: String,
          required: true
     }
});     

let product = mongoose.model(
    'product',
     productSchema

)

module.exports = product