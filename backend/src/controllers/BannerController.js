const { Banner } = require('../models');
const { deleteFile } = require('../utils/fileHelper');

class BannerController {
    async index(req, res) {
        const banners = await Banner.findAll({ order: [['id', 'ASC']] });
        return res.json(banners);
    }

    async store(req, res) {
        try {
            const data = req.body;

            if (req.file) {
                data.imageUrl = req.file.path;
            }

            const banner = await Banner.create(data);
            return res.status(201).json(banner);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao criar banner.' });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const banner = await Banner.findByPk(id);
            if (!banner) return res.status(404).json({ error: 'Banner não encontrado.' });

            const data = req.body;

            if (req.file) {
                if (banner.imageUrl) await deleteFile(banner.imageUrl);
                data.imageUrl = req.file.path;
            }

            const updated = await banner.update(data);
            return res.json(updated);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao atualizar.' });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const banner = await Banner.findByPk(id);
            if (!banner) return res.status(404).json({ error: 'Não encontrado.' });

            await deleteFile(banner.imageUrl);

            await banner.destroy();
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar.' });
        }
    }
}

module.exports = new BannerController();