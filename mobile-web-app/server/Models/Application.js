const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    application_id: {
        type: String,
        required: true 
    },
    applicant_id: {
        type: String, 
        required: true
    },
    application_type: {
        type: Number,
        required: true
    },
    application_date: {
        type: Date,
        default: Date.now
    },
    details: {
        type: String,
        required: true
    }
}) 

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;