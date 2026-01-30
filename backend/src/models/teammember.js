'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TeamMember extends Model {
    static associate(models) {
      // define associations here se tiver no futuro
    }
  }
  TeamMember.init({
    name: DataTypes.STRING,
    role: DataTypes.STRING,
    bio: DataTypes.TEXT,
    imageUrl: {
      type: DataTypes.STRING,
      field: 'image_url' // Mapeia pro banco
    },
    specialties: DataTypes.JSON // Array de strings
  }, {
    sequelize,
    modelName: 'TeamMember',
    tableName: 'team_members', // Força o nome da tabela
    underscored: true, // Garante created_at e updated_at
  });
  return TeamMember;
};