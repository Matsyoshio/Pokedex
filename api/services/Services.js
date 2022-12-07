const database = require('../models')
const { Op } = require('sequelize')

class Services {
    constructor (nomeDoModelo) {
        this.nomeDoModelo = nomeDoModelo
    }

    async pegaTodosOsRegistros() {
        return database[this.nomeDoModelo].findAll()
    }

    async criaRegisto(dados){
        return database[this.nomeDoModelo].create(dados)
    }

    async atualizaRegistro(dadosAtualizados, where){
        return database[this.nomeDoModelo].update(dadosAtualizados, { where: { ...where } })

    }
}

module.exports = Services