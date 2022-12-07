const { Op } = require('sequelize');

const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Treinadores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Treinadores.hasMany(models.Pokemons, {
        foreignKey: 'treinador_id',
        as: 'pokeCapturado',
      });
    }
  }
  Treinadores.init({
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Colocar Nome ao Treinador',
        },
        notEmpty: {
          args: true,
          msg: 'Colocar Nome ao Treinador',
        },
      },
    },
    insignias: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Colocar número de insignias',
        },
        notEmpty: {
          args: true,
          msg: 'Colocar número de insignias',
        },
      },
    },
  }, {
    sequelize,
    paranoid: true,
    scopes: {
      liga: { where: { insignias: { [Op.gte]: 8 } } },
    },
    modelName: 'Treinadores',
  });
  return Treinadores;
};
