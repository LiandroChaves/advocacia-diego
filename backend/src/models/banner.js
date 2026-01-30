'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    static associate(models) {
      // define association here
    }
  }
  Banner.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    imageUrl: { type: DataTypes.STRING, field: 'image_url' }, // Snake case map
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Banner',
    tableName: 'banners',
    underscored: true,
  });
  return Banner;
};