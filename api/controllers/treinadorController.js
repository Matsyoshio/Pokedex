const database = require('../models')

class TreinadorController {
    static async criaTreinador(req, res) {
        const novoTreinador = req.body
        try {
            const novoTreinadorCriado = await database.Treinadores.create(novoTreinador)
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
                const busca = await database.Treinadores.findAll( {
                    where: {
                        nome: nome,
                        insignias: insignias}
                }) 
                return res.status(200).json(busca)    
            } if (insignias === undefined) {                
                const busca = await database.Treinadores.findAll( {
                    where: { 
                        nome: nome
                    }
                }) 
                return res.status(200).json(busca)
            } if (nome === undefined) {                
                const busca = await database.Treinadores.findAll( {
                    where: { 
                    insignias: insignias
            }
                })
                return res.status(200).json(busca)
            }      
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async todoTreinador(req, res) {
        try {
            const todosOsTreinadores = await database.Treinadores.findAll()
            return res.status(200).json(todosOsTreinadores)

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async apagaTreinador(req, res) {
        const { id } = req.params
        try {
            const pokemonSolto = await database.Pokemons.update({
                capturado: 0,
                treinador_id: null
            }, { where:{
                treinador_id: id}
            })     
            await database.Treinadores.destroy( { where: { id: Number(id) } } )
            return res.status(200).json({ mensagem: `Treinador de ID ${id} deletado; Pokémon(s) foi(ram) liberado(s)`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async atualizaTreinador(req, res) {
        const mudaTreinador = req.body
        const { id } = req.params
        try {
            const atualTreinador = await database.Treinadores.update(mudaTreinador, { where: {id: Number(id)}})
            return res.status(200).json(atualTreinador)
            // ajustar mensagem de retorno que nao funcionou
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}




module.exports = TreinadorController