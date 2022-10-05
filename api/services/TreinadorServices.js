const Services = require('./Services')
const database = require('../models')

class TreinadoresServices extends Services {
    constructor(){
        super('Treinadores')
    }
    // métodos especificos do controlador de treinadores
        
    async buscaGeral(local){
            return database[this.nomeDoModelo].findAll({ where: { ...local }})
    }

    async apagaRegisto(id){
        await database.Pokemons.update({
            capturado: 0,
            treinador_id: null
        }, { where:{
            treinador_id: id}
        })
        await database[this.nomeDoModelo].destroy({ where: {id}})   
    }
}


module.exports = TreinadoresServices