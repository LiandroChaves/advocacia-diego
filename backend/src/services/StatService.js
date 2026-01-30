const { Stat } = require('../models');

class StatService {
    async getAll() { return await Stat.findAll({ order: [['id', 'ASC']] }); }
    async create(data) { return await Stat.create(data); }
    async update(id, data) {
        const stat = await Stat.findByPk(id);
        return stat ? await stat.update(data) : null;
    }
    async delete(id) {
        const stat = await Stat.findByPk(id);
        return stat ? await stat.destroy() : null;
    }
}
module.exports = new StatService();