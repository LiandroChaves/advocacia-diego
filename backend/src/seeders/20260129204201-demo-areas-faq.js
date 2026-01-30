'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Seed Areas
    await queryInterface.bulkInsert('practice_areas', [
      {
        title: 'Direito Civil',
        description: 'Assessoria completa em questões civis, contratos e responsabilidade civil.',
        icon: 'Scale',
        created_at: new Date(), updated_at: new Date()
      },
      {
        title: 'Direito Trabalhista',
        description: 'Defesa dos direitos trabalhistas, ações e consultoria preventiva.',
        icon: 'Briefcase',
        created_at: new Date(), updated_at: new Date()
      },
      {
        title: 'Direito de Família',
        description: 'Divórcios, guarda, pensão alimentícia e partilha de bens.',
        icon: 'Users',
        created_at: new Date(), updated_at: new Date()
      },
      {
        title: 'Direito Criminal',
        description: 'Defesa criminal em todas as esferas, com ética e profissionalismo.',
        icon: 'Shield',
        created_at: new Date(), updated_at: new Date()
      }
    ], {});

    // Seed FAQs
    await queryInterface.bulkInsert('faqs', [
      {
        question: 'Como funciona a primeira consulta?',
        answer: 'A primeira consulta é uma reunião para entender seu caso, esclarecer dúvidas e apresentar as possíveis soluções jurídicas.',
        created_at: new Date(), updated_at: new Date()
      },
      {
        question: 'Quais são as formas de pagamento?',
        answer: 'Aceitamos diversas formas de pagamento: à vista, parcelado, cartão de crédito e débito.',
        created_at: new Date(), updated_at: new Date()
      },
      {
        question: 'Quanto tempo leva um processo?',
        answer: 'O tempo varia conforme o tipo de processo e a complexidade do caso. Durante a consulta, podemos dar uma estimativa mais precisa.',
        created_at: new Date(), updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('practice_areas', null, {});
    await queryInterface.bulkDelete('faqs', null, {});
  }
};