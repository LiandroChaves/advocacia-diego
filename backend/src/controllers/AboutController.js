const Service = require('../services/AboutService');
const { deleteFile } = require('../utils/fileHelper');

class AboutController {
    async index(req, res) {
        try {
            const data = await Service.getOne();
            return res.json(data || {});
        }
        catch (e) { return res.status(500).json({ error: 'Erro interno' }); }
    }

    async update(req, res) {
        try {
            const about = await Service.getOne();
            const data = { ...req.body };

            if (req.file) {
                data.imageUrl = `/uploads/${req.file.filename}`;
            }

            if (data.values && typeof data.values === 'string') {
                try {
                    data.values = JSON.parse(data.values);
                } catch (e) {
                    data.values = data.values.split(',').map(v => v.trim()).filter(v => v !== '');
                }
            }

            if (!about) {
                const newAbout = await Service.create(data);
                return res.json(newAbout);
            }

            if (req.file && about.imageUrl) {
                deleteFile(about.imageUrl);
            }

            const updated = await about.update(data);
            return res.json(updated);
        } catch (error) {
            console.error('Erro no AboutController:', error);
            return res.status(500).json({ error: 'Erro ao atualizar.' });
        }
    }
}
module.exports = new AboutController();