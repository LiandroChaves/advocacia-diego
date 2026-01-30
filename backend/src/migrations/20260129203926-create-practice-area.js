'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('practice_areas', { // Nome da tabela no plural e snake_case
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      title: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: false },
      icon: { type: Sequelize.STRING, allowNull: false }, // Nome do ícone (ex: 'Scale')
      created_at: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updated_at: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') }
    });
  },
  async down(queryInterface, Sequelize) { await queryInterface.dropTable('practice_areas'); }
};