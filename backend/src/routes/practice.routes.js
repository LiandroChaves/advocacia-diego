const { Router } = require('express');
const Controller = require('../controllers/PracticeAreaController');
const authMiddleware = require('../middlewares/authMiddleware');
const routes = Router();

routes.get('/', Controller.index);
routes.post('/', authMiddleware, Controller.store);
routes.put('/:id', authMiddleware, Controller.update);
routes.delete('/:id', authMiddleware, Controller.delete);

module.exports = routes;