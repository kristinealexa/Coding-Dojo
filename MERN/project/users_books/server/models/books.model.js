// import mongoose
const mongoose = require('mongoose');

const BooksSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "{PATH} is required"],
        minLength: [3, "{PATH} must be 3 characters long"]
    },
    image: {
        type: String,
        required: [true, "{PATH} is required"],
    },
    price: {
        type: Number,
        required: [true, "{PATH} is required"],
        minLength: [1, "{PATH} must be 3 characters long"]
    },
    description: {
        type: String,
        required: [true, "{PATH} is required"],
        minLength: [5, "{PATH} must be 5 characters long"]
    },
    genre: {
        type: String,
        required: [true, "{PATH} is required"],
        minLength: [3, "{PATH} must be 3 characters long"]
    },
    rating: {
        type: Number,
        required: [true, "{PATH} is required"],
        minLength: [1, "{PATH} must be more than 0"]
    }
}, { timestamps: true });

const Books = mongoose.model('Books', BooksSchema);
module.exports = Books;
