// Models/User.js
const mongoose = require('mongoose');
const { ClientType } = require('./ClientType')

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
  },

  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;