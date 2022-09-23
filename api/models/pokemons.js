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
    nome: DataTypes.STRING,
    tipo1: DataTypes.STRING,
    tipo2: DataTypes.STRING,
    capturado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Pokemons',
  });
  return Pokemons;
};