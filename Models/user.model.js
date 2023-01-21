const { Schema, model } = require("mongoose");


const userSchema = Schema({
    name: String,
    email: [type = String, unique = true],
    password: String,
});

const userModel = model('users', userSchema);

module.exports = { userModel }