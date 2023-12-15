// THE CONTROLLER DOES THE CRUD FOR THE DB 
// import model here

const Pirates = require("../models/pirates.model");

// READ ALL
module.exports.findAllPirates = (req, res) => {
    Pirates.find()
        .then((allDaPirates) => {
            // ! this is what react will receive in its res.data
            res.json(allDaPirates)
        })
        .catch((err) => {
            res.json(err)
        });
};

// READ ONE
module.exports.findOneSinglePirates = (req, res) => {
    Pirates.findOne({ _id: req.params.id })
        .then(oneSinglePirates => {
            res.json(oneSinglePirates)
        })
        .catch((err) => {
            res.json(err)
        });}

// CREATE
module.exports.createNewPirates = (req, res) => {
    Pirates.create(req.body)
        .then(newlyCreatedPirates => {
            res.json(newlyCreatedPirates);
        })
        .catch((err) => {
            res.status(400).json(err)
        });}

// UPDATE
module.exports.updateExistingPirates = (req, res) => {
    Pirates.findOneAndUpdate(
        // this is part of the update
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedPirates => {
            res.json(updatedPirates)
        })
        .catch((err) => {
            res.status(400).json(err)
        });}

// DELETE
module.exports.deleteAnExistingPirates = (req, res) => {
    Pirates.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json(result)
        })
        .catch((err) => {
            res.json(err)
        });}
