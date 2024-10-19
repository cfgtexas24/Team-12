const { application } = require('express');
const { clientType } = require('./ClientType')

const applicationSchema = new mongoose.Schema({
    application_id: {
        type: String,
        required: true 
    },
    applicant_id: {
        type: String, 
        required: true
    },
    applicantion_type: {
        type: Number,
        required: true
    },
    application_date: {
        type: Date,
        default: Date.now
    },
    application_details: {
        type: String,
        required: true
    }
}) 

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;