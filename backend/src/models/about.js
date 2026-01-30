'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class About extends Model {
    static associate(models) {
      // define association here
    }
  }
  About.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    mission: DataTypes.TEXT,
    vision: DataTypes.TEXT,
    values: DataTypes.JSON,
    imageUrl: {
      type: DataTypes.STRING,
      field: 'image_url'
    }
  }, {
    sequelize,
    modelName: 'About',
    tableName: 'abouts',
    underscored: true,
  });
  return About;
};