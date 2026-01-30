const { Contact } = require('../models');

class ContactService {
    // Admin: Ver todas (geralmente as mais recentes primeiro)
    async getAll() {
        return await Contact.findAll({ order: [['created_at', 'DESC']] });
    }

    // Site: Criar mensagem
    async create(data) {
        return await Contact.create(data);
    }

    // Admin: Deletar mensagem lida
    async delete(id) {
        const contact = await Contact.findByPk(id);
        return contact ? await contact.destroy() : null;
    }
}

module.exports = new ContactService();