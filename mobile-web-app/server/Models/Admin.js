const extendSchema = require('mongoose-extend-schema');

const adminSchema = extendSchema(userSchema, {

})

const Admin = mongoose.model('Admin', menteeSchema);

module.exports = Admin;