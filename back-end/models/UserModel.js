const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String
  }, 
  //name of all the repos
  projects: {
    type: [String],
    required: true
  }
}); 

const User = mongoose.model('user', userSchema)
module.exports = User;
