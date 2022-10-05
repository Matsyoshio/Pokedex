const database = require('../models')
const Services = require('./Services')
const { Op } = require('sequelize')


class PokemonsServices extends Services {
    constructor(){
        super('Pokemons')
        this.treinadores = new Services('Treinadores')
    }
    // métodos especificos do controlador de pokemons
        
    async buscaGeral(local = {}){
            return database[this.nomeDoModelo].findAll( { 
                where: { ...local }, 
                include: [{ model: database[this.treinadores], required: true }]
            })
    }
}

module.exports = PokemonsServices