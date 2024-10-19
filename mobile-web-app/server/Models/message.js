const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender_id: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  body: {
    type: String,
    required: true,
  },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
