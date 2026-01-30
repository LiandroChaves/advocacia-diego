const { Router } = require('express');
const multer = require('multer');
const uploadConfig = require('../config/upload');
const TestimonialController = require('../controllers/TestimonialController');

const authMiddleware = require('../middlewares/authMiddleware');

const upload = multer(uploadConfig);
const routes = Router();

routes.get('/', TestimonialController.index);
routes.post('/', authMiddleware, upload.single('avatar'), TestimonialController.store);
routes.put('/:id', authMiddleware, upload.single('avatar'), TestimonialController.update);
routes.delete('/:id', authMiddleware, TestimonialController.delete);

module.exports = routes;