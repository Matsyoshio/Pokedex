const { Router } = require('express')
const PokeController = require('../controllers/pokemonController')


const router = Router()

router
    .post('/pokemons', PokeController.criaPoke)
    .get('/pokemons', PokeController.buscaPoke)
    .get('/pokemons/todos', PokeController.todoPoke)
    .delete('/pokemons/:id', PokeController.apagaPoke)
    .put('/pokemons/:nomePoke', PokeController.atualizaPoke)

module.exports = router