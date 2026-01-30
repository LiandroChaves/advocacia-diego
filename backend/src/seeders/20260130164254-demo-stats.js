'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('stats', [
      { label: 'Clientes', value: '+300', created_at: new Date(), updated_at: new Date() },
      { label: 'Contratos', value: '+200', created_at: new Date(), updated_at: new Date() }
    ], {});
  },
  async down(queryInterface, Sequelize) { await queryInterface.bulkDelete('stats', null, {}); }
};