'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pokemons extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pokemons.belongsTo(models.Treinadores, {
        foreignKey: 'treinador_id'
      })
    }
  }
  Pokemons.init({
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Colocar Nome ao Pokémon'},
        notEmpty: {
          args: true,
          msg: 'Colocar Nome ao Pokémon'}
      }},
    tipo1: DataTypes.STRING,
    tipo2: DataTypes.STRING,
    capturado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Indicar se o Pokémon foi ou não capturado'
        }
      }  
    }
  }, {
    sequelize,
    modelName: 'Pokemons',
  });
  return Pokemons;
};