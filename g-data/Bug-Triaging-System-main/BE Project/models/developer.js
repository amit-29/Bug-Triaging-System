const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const developerSchema = new Schema({

  name: {
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
  },
  resetToken: String,
  resetTokenExpiration: Date,
  

});


module.exports = mongoose.model('Developer',developerSchema);