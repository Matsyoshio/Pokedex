const { Router } = require('express')
const TreinadorController = require('../controllers/treinadorController')

const router = Router()

router
.post('/treinadores', TreinadorController.criaTreinador)
.get('/treinadores/busca', TreinadorController.buscaCompleta)
.get('/treinadores/todos', TreinadorController.todoTreinador)
.delete('/treinadores/:id', TreinadorController.apagaTreinador)
.put('/treinadores/:id', TreinadorController.atualizaTreinador)

module.exports = router