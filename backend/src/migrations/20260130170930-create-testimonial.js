'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('testimonials', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      name: { type: Sequelize.STRING, allowNull: false },
      role: { type: Sequelize.STRING, allowNull: false },
      content: { type: Sequelize.TEXT, allowNull: false },
      avatar: { type: Sequelize.STRING, allowNull: true }, // Iniciais ou URL da foto
      created_at: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updated_at: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') }
    });
  },
  async down(queryInterface, Sequelize) { await queryInterface.dropTable('testimonials'); }
};