const PiratesController = require('../controllers/pirates.controller');

module.exports = app => {
    app.get('/api/pirates', PiratesController.findAllPirates);
    app.get('/api/pirates/:id', PiratesController.findOneSinglePirates);
    app.patch('/api/pirates/:id', PiratesController.updateExistingPirates);
    app.post('/api/pirates', PiratesController.createNewPirates);
    app.delete('/api/pirates/:id', PiratesController.deleteAnExistingPirates);
}
