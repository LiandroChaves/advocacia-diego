const TestimonialService = require('../services/TestimonialService');
const { deleteFile } = require('../utils/fileHelper');

class TestimonialController {
    async index(req, res) {
        try {
            const testimonials = await TestimonialService.getAll();
            return res.json(testimonials);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar depoimentos.' });
        }
    }

    async store(req, res) {
        try {
            const data = req.body;

            if (req.file) {
                data.avatar = req.file.path;
            }

            const testimonial = await TestimonialService.create(data);
            return res.status(201).json(testimonial);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao criar depoimento.' });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const testimonial = await TestimonialService.getById(id);
            if (!testimonial) return res.status(404).json({ error: 'Depoimento não encontrado.' });

            const data = req.body

            if (req.file) {
                if (testimonial.avatar) await deleteFile(testimonial.avatar);
                data.avatar = req.file.path;
            }

            const updated = await TestimonialService.update(id, data);
            if (!updated) return res.status(404).json({ error: 'Depoimento não encontrado.' });
            return res.json(updated);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar depoimento.' });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const testimonial = await TestimonialService.getById(id);
            if (!testimonial) return res.status(404).json({ error: 'Não encontrado.' });

            await deleteFile(testimonial.avatar);

            await TestimonialService.delete(id);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar depoimento.' });
        }
    }
}

module.exports = new TestimonialController();