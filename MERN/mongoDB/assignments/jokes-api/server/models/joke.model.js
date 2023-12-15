// import mongoose
const mongoose = require('mongoose');

const JokeSchema = new mongoose.Schema({
    setup: {
        type: String,
        required: [true, "{PATH} is required"],
        minLength: [2, "{PATH} must be 2 characters long"]
    },
    punchline: {
        type: String,
        required: [true, "{PATH} is required"],
        minLength: [3, "{PATH} must be 3 characters long"]
    }
}, { timestamps: true });

const Joke = mongoose.model('Joke', JokeSchema);
module.exports = Joke;
