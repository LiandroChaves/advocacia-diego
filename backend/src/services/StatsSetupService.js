const { StatsSetup } = require('../models');
class StatsSetupService {
    async getOne() { return await StatsSetup.findOne(); }
    async update(data) {
        const setup = await StatsSetup.findOne();
        if (!setup) return await StatsSetup.create(data);
        return await setup.update(data);
    }
}
module.exports = new StatsSetupService();