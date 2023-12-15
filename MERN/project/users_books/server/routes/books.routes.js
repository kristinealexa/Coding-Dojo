const BooksController = require('../controllers/books.controller');

module.exports = app => {
    app.get('/api/books', BooksController.findAllBooks);
    app.get('/api/books/:id', BooksController.findOneSingleBooks);
    app.patch('/api/books/:id', BooksController.updateExistingBooks);
    app.post('/api/books', BooksController.createNewBooks);
    app.delete('/api/books/:id', BooksController.deleteAnExistingBooks);
}
