var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var loginSchema = new Schema({
    
     userName: {
          type: String,
          required: true
     },

     email: {
          type: String,
          required: true,
     },

     password: {
          type: String,
          required: true

     },

});     



module.exports = loginSchema;