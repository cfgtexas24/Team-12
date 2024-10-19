// Models/User.js
const mongoose = require('mongoose');
const { UserRole } = require('./UserRole')

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
  },

  user_role: {
    type: Number,
    required: true
  },

  username: {
    type: String,
    required: true,
    unique: true,
  }
});

const User = mongoose.model('User', userSchema);

module.exports = {
  User,
  userSchema
};