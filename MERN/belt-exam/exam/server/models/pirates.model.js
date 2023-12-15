// import mongoose
const mongoose = require('mongoose');

const PiratesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "{PATH} is required"],
        minLength: [3, "{PATH} must be 3 characters long"]
    },
    image: {
        type: String,
        required: [true, "{PATH} is required"],
    },
    treasureChests: {
        type: Number,
        required: [true, "{PATH} is required"],
        minLength: [1, "Must be valid"]
    },
    catchPhrase: {
        type: String,
        required: [true, "{PATH} is required"],
        minLength: [3, "{PATH} must be 3 characters long"]
    },
    crewPosition: {
        type: String,
        required: [true, "{PATH} is required"],
        minLength: [3, "{PATH} must be 3 characters long"]
    },
    pegLeg: {
        type: Boolean,
        required: [true, "{PATH} is required"],
        default: true
    },
    eyePatch: {
        type: Boolean,
        required: [true, "{PATH} is required"],
        default: true
    },
    hookHand: {
        type: Boolean,
        required: [true, "{PATH} is required"],
        default: true
    }
}, { timestamps: true });

const Pirates = mongoose.model('Pirates', PiratesSchema);
module.exports = Pirates;
