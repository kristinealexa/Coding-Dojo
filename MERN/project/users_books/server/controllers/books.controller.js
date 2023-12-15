// THE CONTROLLER DOES THE CRUD FOR THE DB 
// import model here

const Books = require("../models/books.model");

// READ ALL
module.exports.findAllBooks = (req, res) => {
    Books.find()
        .then((allDaBooks) => {
            // ! this is what react will receive in its res.data
            res.json(allDaBooks)
        })
        .catch((err) => {
            res.json(err)
        });
};

// READ ONE
module.exports.findOneSingleBooks = (req, res) => {
    Books.findOne({ _id: req.params.id })
        .then(oneSingleBooks => {
            res.json(oneSingleBooks)
        })
        .catch((err) => {
            res.json(err)
        });}

// CREATE
module.exports.createNewBooks = (req, res) => {
    Books.create(req.body)
        .then(newlyCreatedBooks => {
            res.json(newlyCreatedBooks);
        })
        .catch((err) => {
            res.status(400).json(err)
        });}

// UPDATE
module.exports.updateExistingBooks = (req, res) => {
    Books.findOneAndUpdate(
        // this is part of the update
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedBooks => {
            res.json(updatedBooks)
        })
        .catch((err) => {
            res.status(400).json(err)
        });}

// DELETE
module.exports.deleteAnExistingBooks = (req, res) => {
    Books.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json(result)
        })
        .catch((err) => {
            res.json(err)
        });}
