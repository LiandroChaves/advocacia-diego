const { FAQ } = require('../models');

class FaqService {
    async getAll() { return await FAQ.findAll({ order: [['id', 'ASC']] }); }
    async create(data) { return await FAQ.create(data); }
    async update(id, data) {
        const faq = await FAQ.findByPk(id);
        return faq ? await faq.update(data) : null;
    }
    async delete(id) {
        const faq = await FAQ.findByPk(id);
        return faq ? await faq.destroy() : null;
    }
}
module.exports = new FaqService();