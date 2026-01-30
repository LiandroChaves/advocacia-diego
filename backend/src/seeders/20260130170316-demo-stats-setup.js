'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('stats_setups', [{
      background_image_url: '/assets/escritorio.png', // Valor default
      created_at: new Date(), updated_at: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('stats_setups', null, {});
  }
};
