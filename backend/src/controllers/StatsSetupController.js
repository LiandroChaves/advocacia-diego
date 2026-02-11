const Service = require('../services/StatsSetupService');
const { deleteFile } = require('../utils/fileHelper');

class StatsSetupController {
    async index(req, res) {
        try {
            return res.json(await Service.getOne() || {});
        } catch (e) {
            return res.status(500).json({ error: 'Erro interno' });
        }
    }

    async update(req, res) {
        try {
            const setup = await Service.getOne();
            const data = req.body;

            if (req.file) {
                if (setup?.backgroundImageUrl) {
                    await deleteFile(setup.backgroundImageUrl);
                }
                data.backgroundImageUrl = req.file.path;
            }

            return res.json(await Service.update(data));
        } catch (e) {
            console.error(e);
            return res.status(500).json({ error: 'Erro ao atualizar' });
        }
    }
}

module.exports = new StatsSetupController();