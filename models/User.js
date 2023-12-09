//User Schema
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId: Number,
    emailId: String,
    password: String,
    mobile: Number,
    name: String,
    age: Number,
    country: String,
    city: String,
    devices: [Number]
});
const User = mongoose.model('User', UserSchema);

module.exports = User;