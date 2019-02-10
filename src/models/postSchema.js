const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        required: true,
    },
    url: {
        unique: true,
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Post', postSchema);