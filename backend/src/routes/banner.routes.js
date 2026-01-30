const { Router } = require('express');
const multer = require('multer');
const uploadConfig = require('../config/upload');
const Controller = require('../controllers/BannerController');

const authMiddleware = require('../middlewares/authMiddleware');

const upload = multer(uploadConfig);
const routes = Router();

routes.get('/', Controller.index);
routes.post('/', authMiddleware, upload.single('image'), Controller.store);
routes.put('/:id', authMiddleware, upload.single('image'), Controller.update);
routes.delete('/:id', authMiddleware, Controller.delete);

module.exports = routes;