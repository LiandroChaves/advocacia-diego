const { Router } = require('express');
const multer = require('multer');
const uploadConfig = require('../config/upload');
const Controller = require('../controllers/AboutController');
const authMiddleware = require('../middlewares/authMiddleware');

const upload = multer(uploadConfig);
const routes = Router();

routes.get('/', Controller.index);
routes.put('/', authMiddleware, upload.single('image'), Controller.update);

module.exports = routes;