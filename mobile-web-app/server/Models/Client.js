// Models/User.js
const mongoose = require('mongoose');
const { ClientType } = require('../ClientType');
const { userSchema } = require('../User')
const extendSchema = require('mongoose-extend-schema');

const clientSchema = extendSchema(userSchema, {
    client_type: {
        type: Number,
        required: true,
        enum: [ClientType.MENTOR, ClientType.MENTEE],
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
        required: true
    },

    phone_number: {
        type: String,
        required: true
    },

    occupation: {
        type: String, 
        required: true
    },

    years_of_experience: {
        type: Number,
        required: true
    },

    reason_for_application: {
        type: String,
        required: true
    },
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;