/* eslint-disable max-len */
const { Op } = require('sequelize');
const { PokemonsServices } = require('../services');

const pokemonsServices = new PokemonsServices();

class PokeController {
  static async criaPoke(req, res) {
    const novoPoke = req.body;
    const { capturado } = req.body;
    let treinador = req.body.treinador_id;
    if (treinador === undefined) {
      treinador = null;
    }
    try {
      if ((capturado === 0 || capturado === undefined) && treinador !== undefined) {
        return res.status(200).json({ message: 'Pokémon não capturado não pode ter treinador' });
      } if (capturado === 1 && treinador === undefined) {
        return res.status(200).json({ message: 'Pokémon capturado deve ter treinador' });
      }
      const novoPokeCriado = await pokemonsServices.criaRegisto(novoPoke);
      return res.status(200).json(novoPokeCriado);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  // eslint-disable-next-line consistent-return
  static async buscaCompleta(req, res) {
    const { nome } = req.query;
    const { tipo } = req.query;
    const { capturado } = req.query;
    const { treinador } = req.query;

    try {
      // busca com todos os itens
      if (nome !== undefined && tipo !== undefined && capturado !== undefined && treinador !== undefined) {
        const PokeCompleto = await pokemonsServices.buscaGeral({
          nome,
          [Op.or]: [{ tipo1: tipo }, { tipo2: tipo }],
          capturado,
          treinador_id: treinador,
        });
        return res.status(200).json(PokeCompleto);
      } if (tipo === undefined && capturado === undefined && treinador === undefined) {
        const PokeCompleto = await pokemonsServices.buscaGeral({
          nome,
        });
        return res.status(200).json(PokeCompleto);
      } if (nome === undefined && tipo === undefined && treinador === undefined) {
        const PokeCompleto = await pokemonsServices.buscaGeral({
          capturado,
        });
        return res.status(200).json(PokeCompleto);
      } if (nome === undefined && capturado === undefined && treinador === undefined) {
        const PokeCompleto = await pokemonsServices.buscaGeral({
          [Op.or]: [{ tipo1: tipo }, { tipo2: tipo }],
        });
        return res.status(200).json(PokeCompleto);
      } if (nome === undefined && capturado === undefined && tipo === undefined) {
        const PokeCompleto = await pokemonsServices.buscaGeral({
          treinador_id: treinador,
        });
        return res.status(200).json(PokeCompleto);
      } if (tipo === undefined && treinador === undefined) {
        const PokeCompleto = await pokemonsServices.buscaGeral({
          nome,
          capturado,
        });
        return res.status(200).json(PokeCompleto);
      } if (capturado === undefined && treinador === undefined) {
        const PokeCompleto = await pokemonsServices.buscaGeral({
          nome,
          [Op.or]: [{ tipo1: tipo }, { tipo2: tipo }],
        });
        return res.status(200).json(PokeCompleto);
      } if (nome === undefined && treinador === undefined) {
        const PokeCompleto = await pokemonsServices.buscaGeral({
          capturado,
          [Op.or]: [{ tipo1: tipo }, { tipo2: tipo }],
        });
        return res.status(200).json(PokeCompleto);
      } if (nome === undefined && capturado === undefined) {
        const PokeCompleto = await pokemonsServices.buscaGeral({
          treinador_id: treinador,
          [Op.or]: [{ tipo1: tipo }, { tipo2: tipo }],
        });
        return res.status(200).json(PokeCompleto);
      } if (tipo === undefined && capturado === undefined) {
        const PokeCompleto = await pokemonsServices.buscaGeral({
          treinador_id: treinador,
          nome,
        });
        return res.status(200).json(PokeCompleto);
      } if (nome === undefined && tipo === undefined) {
        const PokeCompleto = await pokemonsServices.buscaGeral({
          treinador_id: treinador,
          capturado,
        });
        return res.status(200).json(PokeCompleto);
      }
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async todoPoke(req, res) {
    try {
      const todosOsPoke = await pokemonsServices.pegaTodosOsRegistros();
      return res.status(200).json(todosOsPoke);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async apagaPoke(req, res) {
    const { id } = req.params;
    try {
      await pokemonsServices.apagaRegisto({ id: Number(id) });
      return res.status(200).json({ mensagem: `Pókemon de ID ${id} deletado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async atualizaPoke(req, res) {
    const mudaPoke = req.body;
    const { id } = req.params;
    try {
      const atualPoke = await pokemonsServices.atualizaRegistro(mudaPoke, { id: Number(id) });
      return res.status(200).json(atualPoke);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = PokeController;
