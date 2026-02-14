const { Router } = require('express');
const teamRoutes = require('./team.routes');
const practiceRoutes = require('./practice.routes');
const faqRoutes = require('./faq.routes');
const bannerRoutes = require('./banner.routes');
const aboutRoutes = require('./about.routes');
const statRoutes = require('./stat.routes');
const statsSetupRoutes = require('./statsSetup.routes');
const testimonialRoutes = require('./testimonial.routes');
const contactRoutes = require('./contact.routes');
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const sessionRoutes = require('./session.routes');

const routes = Router();

routes.get('/ping', (req, res) => {
    return res.json({ message: 'Tô acordado, mn!' });
});

routes.use('/auth', authRoutes);
routes.use('/users', userRoutes);
routes.use('/sessions', sessionRoutes);
routes.use('/team', teamRoutes);
routes.use('/practice-areas', practiceRoutes);
routes.use('/faqs', faqRoutes);
routes.use('/banners', bannerRoutes);
routes.use('/about', aboutRoutes);
routes.use('/stats', statRoutes);
routes.use('/stats-setup', statsSetupRoutes);
routes.use('/testimonials', testimonialRoutes);
routes.use('/contacts', contactRoutes);

module.exports = routes;