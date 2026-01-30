const { Router } = require('express');
const AuthController = require('../controllers/AuthController');

const routes = Router();

routes.get('/count', AuthController.count);
routes.post('/', AuthController.register);

module.exports = routes;
