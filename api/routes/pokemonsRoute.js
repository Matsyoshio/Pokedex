const { Router } = require('express');
const PokeController = require('../controllers/pokemonController');

const router = Router();

router
  .post('/pokemons', PokeController.criaPoke)
  .get('/pokemons/busca', PokeController.buscaCompleta)
  .get('/pokemons/todos', PokeController.todoPoke)
  .delete('/pokemons/:id', PokeController.apagaPoke)
  .put('/pokemons/:id', PokeController.atualizaPoke);

module.exports = router;
