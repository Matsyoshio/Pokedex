const Services = require('./Services');
const database = require('../models');

class TreinadoresServices extends Services {
  constructor() {
    super('Treinadores');
  }
  // métodos especificos do controlador de treinadores

  async buscaGeral(local) {
    return database[this.nomeDoModelo].findAll({ where: { ...local } });
  }

  async apagaRegisto(id) {
    database.sequelize.transaction(async (transacao) => {
      await database.Pokemons.update({
        capturado: 0,
        treinador_id: null,
      }, {
        where: { treinador_id: id },
      }, {
        transaction: transacao,
      });
      await database[this.nomeDoModelo].destroy({ where: { id } }, { transaction: transacao });
    });
  }

  async restauraRegistro(id) {
    await database[this.nomeDoModelo].restore({ where: { id } });
  }

  async buscaLiga() {
    return database[this.nomeDoModelo].scope('liga').findAll();
  }

  // eslint-disable-next-line class-methods-use-this
  async pokeCapturado(id) {
    return database.Pokemons.findAndCountAll({ where: { treinador_id: Number(id) } });
  }
}

module.exports = TreinadoresServices;
