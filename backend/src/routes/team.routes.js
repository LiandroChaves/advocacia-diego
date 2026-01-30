const { Router } = require('express');
const multer = require('multer');
const uploadConfig = require('../config/upload');
const TeamController = require('../controllers/TeamController');

const authMiddleware = require('../middlewares/authMiddleware');

const upload = multer(uploadConfig);
const routes = Router();

routes.get('/', TeamController.index);
routes.post('/', authMiddleware, upload.single('image'), TeamController.store);     // Criar
routes.put('/:id', authMiddleware, upload.single('image'), TeamController.update);  // Editar
routes.delete('/:id', authMiddleware, TeamController.delete); // Deletar

module.exports = routes;