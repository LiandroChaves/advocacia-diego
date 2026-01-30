const { Banner } = require('../models');

class BannerService {
    async getAll() { return await Banner.findAll({ order: [['id', 'ASC']] }); } // Retorna tudo no painel, inclusive inativos
    async create(data) { return await Banner.create(data); }
    async update(id, data) {
        const banner = await Banner.findByPk(id);
        return banner ? await banner.update(data) : null;
    }
    async delete(id) {
        const banner = await Banner.findByPk(id);
        return banner ? await banner.destroy() : null;
    }
}
module.exports = new BannerService();