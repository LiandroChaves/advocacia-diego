require('dotenv').config();
const app = require('./src/app');
const { sequelize } = require('./src/models'); // O Sequelize cria esse index.js automático

const PORT = process.env.PORT || 3000;

// Função para iniciar o banco e depois o servidor
async function start() {
    try {
        // Tenta conectar no Postgres
        await sequelize.authenticate();
        console.log('✅ Conexão com o Banco de Dados estabelecida com sucesso!');

        // Se conectou, sobe o servidor
        app.listen(PORT, () => {
            console.log(`🔥 Servidor rodando na porta ${PORT}`);
            console.log(`👉 http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Não foi possível conectar ao banco de dados:', error);
    }
}

start();