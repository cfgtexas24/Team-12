const extendSchema = require('mongoose-extend-schema');
const { UserRole } = require('./UserRole');

const adminSchema = extendSchema(userSchema, {
    user_role: {
        type: String,
        default: UserRole.ADMIN
      }
})

const Admin = mongoose.model('Admin', menteeSchema);

module.exports = Admin;