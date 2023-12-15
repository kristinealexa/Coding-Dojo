const AuthorsController = require('../controllers/authors.controller');

module.exports = app => {
    app.get('/api/authors', AuthorsController.findAllAuthors);
    app.get('/api/authors/:id', AuthorsController.findOneSingleAuthors);
    app.patch('/api/authors/:id', AuthorsController.updateExistingAuthors);
    app.post('/api/authors', AuthorsController.createNewAuthors);
    app.delete('/api/authors/:id', AuthorsController.deleteAnExistingAuthors);
}
