const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator")

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// validation for not having unique user - package used
UserSchema.plugin(uniqueValidator);

const User = mongoose.model('User', UserSchema);

module.exports = User;
