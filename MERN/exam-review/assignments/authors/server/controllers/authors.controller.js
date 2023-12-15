// THE CONTROLLER DOES THE CRUD FOR THE DB 
// import model here

const Authors = require("../models/authors.model");

// READ ALL
module.exports.findAllAuthors = (req, res) => {
    Authors.find()
        .then((allDaAuthors) => {
            // ! this is what react will receive in its res.data
            res.json(allDaAuthors)
        })
        .catch((err) => {
            res.json(err)
        });
};

// READ ONE
module.exports.findOneSingleAuthors = (req, res) => {
    Authors.findOne({ _id: req.params.id })
        .then(oneSingleAuthors => {
            res.json(oneSingleAuthors)
        })
        .catch((err) => {
            res.json(err)
        });}

// CREATE
module.exports.createNewAuthors = (req, res) => {
    Authors.create(req.body)
        .then(newlyCreatedAuthors => {
            res.json(newlyCreatedAuthors);
        })
        .catch((err) => {
            res.status(400).json(err)
        });}

// UPDATE
module.exports.updateExistingAuthors = (req, res) => {
    Authors.findOneAndUpdate(
        // this is part of the update
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedAuthors => {
            res.json(updatedAuthors)
        })
        .catch((err) => {
            res.status(400).json(err)
        });}

// DELETE
module.exports.deleteAnExistingAuthors = (req, res) => {
    Authors.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json(result)
        })
        .catch((err) => {
            res.json(err)
        });}
