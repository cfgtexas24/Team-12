const extendSchema = require('mongoose-extend-schema');
const { clientSchema } = require('./Client')

const mentorSchema = extendSchema(clientSchema, {
}) 

const Mentor = mongoose.model('Mentor', mentorSchema);

module.exports = Mentor;