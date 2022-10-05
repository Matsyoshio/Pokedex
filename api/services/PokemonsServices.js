const database = require('../models')
const Services = require('./Services')
const { Op } = require('sequelize')


class PokemonsServices extends Services {
    constructor(){
        super('Pokemons')
        this.treinadores = new Services('Treinadores')
    }
    // métodos especificos do controlador de pokemons
        
    async buscaGeral(local, include){
        return database[this.nomeDoModelo].findAll( { 
            where: { ...local }, 
            include: [{model: database.Treinadores}]
            })
    }
    
    async apagaRegisto(local){
        return database[this.nomeDoModelo].destroy( {
            where: {...local}
        })
    }
}

module.exports = PokemonsServices