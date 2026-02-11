const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

// Configure cloudinary (needs to match config/cloudinary.js setup if not automatically picked up via env)
require('dotenv').config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const deleteFile = async (filePath) => {
    if (!filePath) return;

    // 1. Deletar do Cloudinary (se for URL completa)
    if (filePath.startsWith('http')) {
        try {
            // Ex: https://res.cloudinary.com/demo/image/upload/v1234567890/advocacia-diego/my-image.jpg
            // Precisamos extrair 'advocacia-diego/my-image'

            // Regex para pegar tudo após 'upload/' e a versão opcional 'v<numeros>/'
            const regex = /upload\/(?:v\d+\/)?(.+)\.[a-zA-Z0-9]+$/;
            const match = filePath.match(regex);

            if (match && match[1]) {
                const publicId = match[1];
                await cloudinary.uploader.destroy(publicId);
                console.log('✅ Arquivo deletado do Cloudinary:', publicId);
            } else {
                console.warn('⚠️ Não foi possível extrair public_id da URL:', filePath);
            }

        } catch (err) {
            console.error('❌ Erro ao deletar no Cloudinary:', err);
        }
        return;
    }

    // 2. Deletar Local (Falllback para arquivos antigos)
    if (filePath.startsWith('/uploads') || filePath.startsWith('uploads')) {
        const fileName = filePath.replace('/uploads/', '').replace('uploads/', '');
        const fullPath = path.resolve(__dirname, '..', '..', 'uploads', fileName);

        try {
            if (fs.existsSync(fullPath)) {
                fs.unlinkSync(fullPath);
                console.log('✅ Arquivo local deletado:', fileName);
            }
        } catch (err) {
            console.error('❌ Erro ao deletar arquivo local:', err);
        }
    }
};

module.exports = { deleteFile };