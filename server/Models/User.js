const mongoose = require('mongoose');

const  Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ // Email validation
      },
      password: {
        type: String,
        required: true,
        minlength: 6
      },
});

const UserModel = mongoose.model('users',UserSchema);
module.exports = UserModel;