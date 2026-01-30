const { User } = require('../models');

class UserService {
    async getAll() {
        return await User.findAll({
            attributes: ['id', 'email', 'name', 'createdAt'],
            order: [['id', 'ASC']]
        });
    }

    async getById(id) {
        return await User.findByPk(id, {
            attributes: ['id', 'email', 'name', 'createdAt']
        });
    }

    async getByEmail(email) {
        return await User.findOne({ where: { email } });
    }

    async count() {
        return await User.count();
    }

    async create(data) {
        return await User.create(data);
    }
}

module.exports = new UserService();
