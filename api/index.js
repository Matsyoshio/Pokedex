const express = require('express')
const routes = require('./routes')

const app = express()

const port = 3000


routes(app)

app.listen(port, () => console.log(`O servidor está conectado na porta ${port}`))

module.exports = app

//testando o versionamento do programa (vou commitar e depois vou voltar a versão)