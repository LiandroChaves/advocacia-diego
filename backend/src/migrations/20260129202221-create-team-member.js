'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('team_members', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false // Nome é obrigatório
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false // Cargo é obrigatório
      },
      bio: {
        type: Sequelize.TEXT, // Texto longo
        allowNull: false
      },
      image_url: { // O Sequelize converte camelCase pra snake_case no banco se configurado, mas vamos forçar aqui pra garantir
        type: Sequelize.STRING,
        field: 'image_url', // Nome da coluna no banco
        allowNull: true // Pode ser que no começo não tenha foto
      },
      specialties: {
        type: Sequelize.JSON, // Postgres aceita JSON nativo
        allowNull: false,
        defaultValue: [] // Se não mandar nada, salva um array vazio
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('team_members');
  }
};