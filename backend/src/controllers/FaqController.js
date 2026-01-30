const Service = require('../services/FaqService');

class FaqController {
    async index(req, res) {
        try { return res.json(await Service.getAll()); } catch (e) { return res.status(500).json({ error: 'Erro interno' }); }
    }
    async store(req, res) {
        try { return res.status(201).json(await Service.create(req.body)); } catch (e) { return res.status(500).json({ error: 'Erro ao criar' }); }
    }
    async update(req, res) {
        try {
            const updated = await Service.update(req.params.id, req.body);
            return updated ? res.json(updated) : res.status(404).json({ error: 'Não encontrado' });
        } catch (e) { return res.status(500).json({ error: 'Erro ao atualizar' }); }
    }
    async delete(req, res) {
        try {
            await Service.delete(req.params.id);
            return res.status(204).send();
        } catch (e) { return res.status(500).json({ error: 'Erro ao deletar' }); }
    }
}
module.exports = new FaqController();