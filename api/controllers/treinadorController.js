const { TreinadorServices } = require('../services');

const treinadorServices = new TreinadorServices();

class TreinadorController {
  static async criaTreinador(req, res) {
    const novoTreinador = req.body;
    try {
      const novoTreinadorCriado = await treinadorServices.criaRegisto(novoTreinador);
      return res.status(200).json(novoTreinadorCriado);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  // eslint-disable-next-line consistent-return
  static async buscaCompleta(req, res) {
    const { nome } = req.query;
    const { insignias } = req.query;

    try {
      // busca com todos os itens
      if (nome !== undefined && insignias !== undefined) {
        const busca = await treinadorServices.buscaGeral(
          {
            nome,
            insignias,
          },
        );
        return res.status(200).json(busca);
      } if (insignias === undefined) {
        const busca = await treinadorServices.buscaGeral({
          nome,
        });
        return res.status(200).json(busca);
      } if (nome === undefined) {
        const busca = await treinadorServices.buscaGeral({
          insignias,
        });
        return res.status(200).json(busca);
      }
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async todoTreinador(req, res) {
    try {
      const todosOsTreinadores = await treinadorServices.pegaTodosOsRegistros();
      return res.status(200).json(todosOsTreinadores);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async todoTreinadorLiga(req, res) {
    try {
      const todosOsTreinadores = await treinadorServices.buscaLiga();
      return res.status(200).json(todosOsTreinadores);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async apagaTreinador(req, res) {
    const { id } = req.params;
    try {
      await treinadorServices.apagaRegisto(Number(id));
      return res.status(200).json({ mensagem: `Treinador de ID ${id} deletado; Pokémon(s) foi(ram) liberado(s)` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async atualizaTreinador(req, res) {
    const mudaTreinador = req.body;
    const { id } = req.params;
    try {
      // eslint-disable-next-line max-len
      const atualTreinador = await treinadorServices.atualizaRegistro(mudaTreinador, { id: Number(id) });
      return res.status(200).json(atualTreinador);
      // ajustar mensagem de retorno que nao funcionou
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async restauraTreinador(req, res) {
    const { id } = req.params;
    try {
      await treinadorServices.restauraRegistro(Number(id));
      return res.status(200).json({ mensagem: `Treinador ${id} restaurado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaPokeCapturado(req, res) {
    const { idTreinador } = req.params;
    try {
      const pokeCapturados = await treinadorServices.pokeCapturado(Number(idTreinador));
      return res.status(200).json({ pokeCapturados });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = TreinadorController;
