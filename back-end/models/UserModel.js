const mongoose = require('mongoose');
const MONGO_URI = process.env.DB_STRING

mongoose.connect(MONGO_URI)
.then((data) => {
  console.log('connected');
})
.catch((err) => {
  console.log(err);
})

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  //Project is an array containing the name of all the repos
  projects: {
    type: [String],
    default: [],
    // required: true
  },
  token: {
    type: String,
    require: true
  }
}); 
const User = mongoose.model('user', userSchema)
module.exports = User;
