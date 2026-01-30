'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Testimonial extends Model {
    static associate(models) {
      // define association here
    }
  }
  Testimonial.init({
    name: DataTypes.STRING,
    role: DataTypes.STRING,
    content: DataTypes.TEXT,
    avatar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Testimonial',
    tableName: 'testimonials',
    underscored: true,
  });
  return Testimonial;
};