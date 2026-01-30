const TeamService = require('../services/TeamService');
const { deleteFile } = require('../utils/fileHelper');

class TeamController {
    async index(req, res) {
        try {
            const team = await TeamService.getAll();
            return res.json(team);
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno.' });
        }
    }

    async store(req, res) {
        try {
            const data = req.body;

            if (req.file) {
                data.imageUrl = `/uploads/${req.file.filename}`;
            }

            if (data.specialties && typeof data.specialties === 'string') {
                try {
                    data.specialties = JSON.parse(data.specialties);
                } catch (e) {
                    data.specialties = data.specialties.split(',').map(s => s.trim());
                }
            }

            const member = await TeamService.create(data);
            return res.status(201).json(member);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao criar.' });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const member = await TeamService.getById(id);
            if (!member) return res.status(404).json({ error: 'Membro não encontrado.' });

            const data = req.body;

            if (req.file) {
                if (member.imageUrl) {
                    deleteFile(member.imageUrl);
                }
                data.imageUrl = `/uploads/${req.file.filename}`;
            }

            if (data.specialties && typeof data.specialties === 'string') {
                try {
                    data.specialties = JSON.parse(data.specialties);
                } catch (e) {
                    data.specialties = data.specialties.split(',').map(s => s.trim());
                }
            }

            const updated = await TeamService.update(id, data);
            return res.json(updated);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao atualizar.' });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const member = await TeamService.getById(id);
            if (!member) return res.status(404).json({ error: 'Não encontrado.' });

            if (member.imageUrl) {
                deleteFile(member.imageUrl);
            }

            await TeamService.delete(id);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar.' });
        }
    }
}

module.exports = new TeamController();