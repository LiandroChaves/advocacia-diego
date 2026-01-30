const fs = require('fs');
const path = require('path');

const deleteFile = (filePath) => {
    if (!filePath) return;

    if (filePath.startsWith('/uploads') || filePath.startsWith('uploads')) {
        const fileName = filePath.replace('/uploads/', '').replace('uploads/', '');
        const fullPath = path.resolve(__dirname, '..', '..', 'uploads', fileName);

        try {
            if (fs.existsSync(fullPath)) {
                fs.unlinkSync(fullPath);
            }
        } catch (err) {
            console.error('Erro ao deletar arquivo:', err);
        }
    }
};

module.exports = { deleteFile };