'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('banners', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      title: { type: Sequelize.STRING, allowNull: true }, // Pode ter banner só com imagem
      description: { type: Sequelize.STRING, allowNull: true },
      image_url: { type: Sequelize.STRING, allowNull: false }, // Obrigatório
      active: { type: Sequelize.BOOLEAN, defaultValue: true }, // Por padrão nasce ativo
      created_at: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updated_at: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') }
    });
  },
  async down(queryInterface, Sequelize) { await queryInterface.dropTable('banners'); }
};