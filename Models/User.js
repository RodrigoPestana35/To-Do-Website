const mongoose = require('mongoose');
const brcypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    this.password = await brcypt.hash(this.password, 10);
    next();
})

module.exports = mongoose.model('User', userSchema);
