'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PracticeArea extends Model {
    static associate(models) {
      // define association here
    }
  }
  PracticeArea.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    icon: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PracticeArea',
    tableName: 'practice_areas', // Força o nome
    underscored: true,
  });
  return PracticeArea;
};