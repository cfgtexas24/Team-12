// Models/User.js
const mongoose = require('mongoose');
const { ClientType } = require('./ClientType');
const { UserRole } = require('./UserRole');
const { userSchema } = require('./User')
const extendSchema = require('mongoose-extend-schema');

const clientSchema = extendSchema(userSchema, {
    user_role: {
      type: String,
      default: UserRole.CLIENT
    },

    client_type: {
        type: Number,
        default: ClientType.MENTEE
      },

    email: {
      type: String,
      required: true
    },

    password: {
      type: String,
      required: true,
    },

    preferred_attributes: {
      type: String,
      default: null
    },

    phone_number: {
        type: String,
        default: null
    },

    occupation: {
        type: String, 
        default: null
    },

    years_of_experience: {
        type: Number,
        default: null
    },

    reason_for_application: {
        type: String,
        default: null
    },
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;