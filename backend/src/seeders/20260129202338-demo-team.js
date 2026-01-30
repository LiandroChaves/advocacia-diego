'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('team_members', [
      {
        name: 'Diêgo Thales',
        role: 'Advogado Sócio Proprietário',
        bio: 'Especialista em Direito Civil com mais de 8 anos de experiência.',
        image_url: '/assets/diego.png', // Caminho relativo ou URL
        specialties: JSON.stringify(['Direito Civil', 'Direito Contratual']),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Jonatas',
        role: 'Advogado',
        bio: 'Advogado especializado em Direito Civil.',
        image_url: '/assets/jonatas.png',
        specialties: JSON.stringify(['Direito Trabalhista', 'Direito Previdenciário']),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Heloisa',
        role: 'Advogada Estagiária',
        bio: 'Estagiária em Direito Civil com mais de 8 anos de experiência.',
        image_url: '/assets/heloisa.png',
        specialties: JSON.stringify(['Direito Civil', 'Direito Contratual']),
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('team_members', null, {});
  }
};