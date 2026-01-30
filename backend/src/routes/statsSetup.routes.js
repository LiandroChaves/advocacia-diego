const { Router } = require('express');
const multer = require('multer');
const uploadConfig = require('../config/upload');
const Controller = require('../controllers/StatsSetupController');

const authMiddleware = require('../middlewares/authMiddleware');

const upload = multer(uploadConfig);
const routes = Router();

routes.get('/', Controller.index);
routes.put('/', authMiddleware, upload.single('backgroundImage'), Controller.update);

module.exports = routes;