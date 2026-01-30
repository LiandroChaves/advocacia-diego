const { PracticeArea } = require('../models');

class PracticeAreaService {
    async getAll() { return await PracticeArea.findAll({ order: [['id', 'ASC']] }); }
    async create(data) { return await PracticeArea.create(data); }
    async update(id, data) {
        const area = await PracticeArea.findByPk(id);
        return area ? await area.update(data) : null;
    }
    async delete(id) {
        const area = await PracticeArea.findByPk(id);
        return area ? await area.destroy() : null;
    }
}
module.exports = new PracticeAreaService();