const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    edited: {
        type: Boolean,
        default: false
    },
    editedAt: {
        type: Date,
        default: null
    },
    concluded: {
        type: Boolean,
        default: false
    },
    concludedAt: {
        type: Date,
        default: null
    },
    type: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Task', TaskSchema);