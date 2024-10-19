const mongoose = require('mongoose');
const NotificationLevel = require('./NotificationLevel');
const NotificationType = require('./NotificationType');

const notificationSchema = new mongoose.Schema({
  sender_id: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  notification_level: {
    type: Number,
    required: true,
    enum: Object.values(NotificationLevel),
  },
  notification_type: {
    type: String,
    required: true,
    enum: Object.values(NotificationType),
  },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
