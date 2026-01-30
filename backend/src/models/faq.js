'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FAQ extends Model {
    static associate(models) {
      // define association here
    }
  }
  FAQ.init({
    question: DataTypes.STRING,
    answer: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'FAQ',
    tableName: 'faqs', // Força o nome
    underscored: true,
  });
  return FAQ;
};