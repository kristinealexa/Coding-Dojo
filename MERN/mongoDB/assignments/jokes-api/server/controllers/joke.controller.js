// THE CONTROLLER DOES THE CRUD FOR THE DB 
// import model here

const Joke = require("../models/joke.model");

// READ ALL
module.exports.findAllJokes = (req, res) => {
    Joke.find()
        .then((allDaJokes) => {
            res.json(allDaJokes)
        })
        .catch((err) => {
            res.json(err)
        });
};

// READ ONE
module.exports.findOneSingleJoke = (req, res) => {
    Joke.findOne({ _id: req.params.id })
        .then(oneSingleJoke => {
            // leaving joke: for example but can delete since you dont have to wrap it
            res.json({ joke: oneSingleJoke })
        })
        .catch((err) => {
            res.json(err)
        });}

// CREATE
module.exports.createNewJoke = (req, res) => {
    Joke.create(req.body)
        .then(newlyCreatedJoke => {
            res.json(newlyCreatedJoke);
        })
        .catch((err) => {
            res.json(err)
        });}

// UPDATE
module.exports.updateExistingJoke = (req, res) => {
    Joke.findOneAndUpdate(
        // this is part of the update
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedJoke => {
            res.json(updatedJoke)
        })
        .catch((err) => {
            res.json(err)
        });}

// DELETE
module.exports.deleteAnExistingJoke = (req, res) => {
    Joke.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json(result)
        })
        .catch((err) => {
            res.json(err)
        });}
