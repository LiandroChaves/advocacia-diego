const { Testimonial } = require('../models');

class TestimonialService {
    async getAll() { return await Testimonial.findAll({ order: [['id', 'ASC']] }); }
    async create(data) { return await Testimonial.create(data); }
    async getById(id) { return await Testimonial.findByPk(id); }
    async update(id, data) {
        const item = await Testimonial.findByPk(id);
        return item ? await item.update(data) : null;
    }
    async delete(id) {
        const item = await Testimonial.findByPk(id);
        return item ? await item.destroy() : null;
    }
}
module.exports = new TestimonialService();