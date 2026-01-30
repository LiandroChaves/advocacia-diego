const { About } = require('../models');

class AboutService {
    async getOne() {
        return await About.findOne();
    }
    async create(data) {
        return await About.create(data);
    }
}
module.exports = new AboutService();