const database = require('../models')
const { TreinadorServices } = require('../services')
const treinadorServices = new TreinadorServices()



class TreinadorController {
    static async criaTreinador(req, res) {
        const novoTreinador = req.body
        try {
            const novoTreinadorCriado = await treinadorServices.criaRegisto(novoTreinador)
            return res.status(200).json(novoTreinadorCriado)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async buscaCompleta(req, res) {
        const nome = req.query.nome
        const insignias = req.query.insignias
        
        try {
            // busca com todos os itens
            if (nome != undefined && insignias != undefined) {
                const busca = await treinadorServices.buscaGeral( 
                    {
                        nome: nome,
                        insignias: insignias}
                ) 
                return res.status(200).json(busca)    
            } if (insignias === undefined) {                
                const busca = await treinadorServices.buscaGeral( {                    
                        nome: nome
                    }
                ) 
                return res.status(200).json(busca)
            } if (nome === undefined) {                
                const busca = await database.Treinadores.findAll( {
                    insignias: insignias
            })
                return res.status(200).json(busca)
            }      
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async todoTreinador(req, res) {
        try {
            const todosOsTreinadores = await treinadorServices.pegaTodosOsRegistros()
            return res.status(200).json(todosOsTreinadores)

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async apagaTreinador(req, res) {
        const { id } = req.params
        try {  
            await treinadorServices.apagaRegisto( Number(id)  )
            return res.status(200).json({ mensagem: `Treinador de ID ${id} deletado; Pokémon(s) foi(ram) liberado(s)`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async atualizaTreinador(req, res) {
        const mudaTreinador = req.body
        const { id } = req.params
        try {
            const atualTreinador = await treinadorServices.atualizaRegistro(mudaTreinador, {id: Number(id)})
            return res.status(200).json(atualTreinador)
            // ajustar mensagem de retorno que nao funcionou
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}




module.exports = TreinadorController