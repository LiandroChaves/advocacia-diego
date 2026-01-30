'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Seed Banners
    await queryInterface.bulkInsert('banners', [
      {
        title: 'Justiça e Equidade',
        description: 'Defendendo seus interesses com integridade.',
        image_url: '/assets/view-3d-justice-scales.jpg',
        active: true,
        created_at: new Date(), updated_at: new Date()
      },
      {
        title: 'Excelência Jurídica',
        description: 'Experiência para solucionar casos complexos.',
        image_url: '/assets/photorealistic-lawyer-environment.jpg',
        active: true,
        created_at: new Date(), updated_at: new Date()
      },
      {
        title: 'Compromisso com o Cliente',
        description: 'Atendimento personalizado e humanizado.',
        image_url: '/assets/gavel-scales-justice-law-books.jpg',
        active: true,
        created_at: new Date(), updated_at: new Date()
      }
    ], {});

    // Seed About (Apenas 1 registro)
    await queryInterface.bulkInsert('abouts', [
      {
        title: 'Sobre o Escritório',
        description: 'Somos um escritório de advocacia comprometido com a excelência e ética profissional.',
        mission: 'Oferecer serviços jurídicos de alta qualidade com ética e comprometimento.',
        vision: 'Ser referência em advocacia, reconhecidos pela excelência e inovação.',
        values: JSON.stringify(['Ética', 'Transparência', 'Comprometimento', 'Excelência']),
        created_at: new Date(), updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('banners', null, {});
    await queryInterface.bulkDelete('abouts', null, {});
  }
};