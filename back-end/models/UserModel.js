const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  //Project is an array containing the name of all the repos
  projects: {
    type: [String],
    required: true
  }
}); 

const User = mongoose.model('user', userSchema)
module.exports = User;
