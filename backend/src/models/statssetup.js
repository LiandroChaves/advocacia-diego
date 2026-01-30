'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StatsSetup extends Model {
    static associate(models) {
      // define association here
    }
  }
  // ... init
  StatsSetup.init({
    backgroundImageUrl: { type: DataTypes.STRING, field: 'background_image_url' }
  }, {
    sequelize,
    modelName: 'StatsSetup',
    tableName: 'stats_setups',
    underscored: true,
  });
  return StatsSetup;
};