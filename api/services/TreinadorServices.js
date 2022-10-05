const Services = require('./Services')
const database = require('../models')

class TreinadoresServices extends Services {
    constructor(){
        super('Treinadores')
    }
    // métodos especificos do controlador de treinadores
        
    async buscaGeral(local = {}){
            return database[this.nomeDoModelo].findAll({ where: { ...local }})}
}

module.exports = TreinadoresServices