const { Router } = require('express');
const AuthController = require('../controllers/AuthController');

const routes = Router();

routes.post('/', AuthController.login);
routes.get('/verify', AuthController.verify);

module.exports = routes;
