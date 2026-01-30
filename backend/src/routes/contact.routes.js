const { Router } = require('express');
const ContactController = require('../controllers/ContactController');

const routes = Router();

routes.get('/', ContactController.index);   // Admin vê todas
routes.post('/', ContactController.store);  // Site envia
routes.delete('/:id', ContactController.delete); // Admin deleta

module.exports = routes;