const { Router } = require('express')
const TreinadorController = require('../controllers/treinadorController')

const router = Router()

router
.post('/treinadores', TreinadorController.criaTreinador)
.get('/treinadores/busca', TreinadorController.buscaCompleta)
.get('/treinadores/todos', TreinadorController.todoTreinador)
.get('/treinadores/liga', TreinadorController.todoTreinadorLiga)
.get('/treinadores/:idTreinador/pokemons', TreinadorController.pegaPokeCapturado)
.delete('/treinadores/:id', TreinadorController.apagaTreinador)
.put('/treinadores/:id', TreinadorController.atualizaTreinador)
.post('/treinadores/:id/restaura', TreinadorController.restauraTreinador)

module.exports = router