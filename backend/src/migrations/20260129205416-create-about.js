'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('abouts', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      title: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: false },
      mission: { type: Sequelize.TEXT, allowNull: false },
      vision: { type: Sequelize.TEXT, allowNull: false },
      values: { type: Sequelize.JSON, allowNull: false, defaultValue: [] }, // Array de strings
      created_at: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updated_at: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') }
    });
  },
  async down(queryInterface, Sequelize) { await queryInterface.dropTable('abouts'); }
};