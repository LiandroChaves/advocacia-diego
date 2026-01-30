const { TeamMember } = require('../models');

class TeamService {
    async getAll() {
        return await TeamMember.findAll({ order: [['id', 'ASC']] });
    }

    async getById(id) {
        return await TeamMember.findByPk(id);
    }

    async create(data) {
        return await TeamMember.create(data);
    }

    async update(id, data) {
        const member = await TeamMember.findByPk(id);
        if (!member) return null;
        return await member.update(data);
    }

    async delete(id) {
        const member = await TeamMember.findByPk(id);
        if (!member) return null;
        return await member.destroy();
    }
}

module.exports = new TeamService();