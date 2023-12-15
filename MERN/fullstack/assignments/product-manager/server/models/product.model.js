// import mongoose
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "{PATH} is required"],
        minLength: [2, "{PATH} must be 2 characters long"]
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
    }
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
