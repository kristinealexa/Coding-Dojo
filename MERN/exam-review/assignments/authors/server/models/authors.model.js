// import mongoose
const mongoose = require('mongoose');

const AuthorsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "{PATH} is required"],
        minLength: [3, "{PATH} must be 3 characters long"]
    }
    // price: {
    //     type: Number,
    //     required: [true, "{PATH} is required"],
    //     minLength: [1, "{PATH} must be 3 characters long"]
    // },
    // description: {
    //     type: String,
    //     required: [true, "{PATH} is required"],
    //     minLength: [5, "{PATH} must be 5 characters long"]
    // }
}, { timestamps: true });

const Authors = mongoose.model('Authors', AuthorsSchema);
module.exports = Authors;
