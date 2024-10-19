const extendSchema = require('mongoose-extend-schema');
const { clientSchema } = require('./Client')

const menteeSchema = extendSchema(clientSchema, {
}) 

const Mentee = mongoose.model('Mentee', menteeSchema);

module.exports = Mentee;