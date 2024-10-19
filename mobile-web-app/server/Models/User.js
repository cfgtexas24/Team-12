const mongoose = require('mongoose');
const UserType = require('./UserType');

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  user_type: {
    type: Number,
    required: true,
    enum: Object.values(UserType),
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});


const User = mongoose.model('User', userSchema);

module.exports = User;