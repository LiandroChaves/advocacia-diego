const ContactService = require('../services/ContactService');

class ContactController {
    async index(req, res) {
        try {
            const messages = await ContactService.getAll();
            return res.json(messages);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar mensagens.' });
        }
    }

    async store(req, res) {
        try {
            // Validação básica
            if (!req.body.name || !req.body.email || !req.body.message) {
                return res.status(400).json({ error: 'Nome, email e mensagem são obrigatórios.' });
            }

            const message = await ContactService.create(req.body);
            return res.status(201).json(message);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao enviar mensagem.' });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            await ContactService.delete(id);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar mensagem.' });
        }
    }
}

module.exports = new ContactController();