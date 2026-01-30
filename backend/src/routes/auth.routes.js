const { Router } = require('express');
const AuthController = require('../controllers/AuthController');

const routes = Router();

routes.post('/register', AuthController.register);
routes.post('/login', AuthController.login);
routes.get('/verify', AuthController.verify);

module.exports = routes;
