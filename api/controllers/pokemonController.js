const database = require('../models')

class PokeController {
    static async criaPoke(req, res) {
        const novoPoke = req.body
        try {
            const novoPokeCriado = await database.Pokemon.create(novoPoke)
            return res.status(200).json(novoPokeCriado)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async buscaPoke(req, res) {
        const nome = req.query.nome
        try {
            const Pokes = await database.Pokemon.findAll( {
                where: {
                    nome: nome
                    }
            })
            return res.status(200).json(Pokes)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async buscaCompleta(req, res) {
        const nome = req.query.nome
        const tipo = req.query.tipo
        const capturado = req.query.capturado
        
        try {
            // busca com todos os itens
            if (nome != undefined && tipo != undefined && capturado != undefined) {
                const PokeCompleto = await database.Pokemon.findAll( {
                    where: {
                        nome: nome,
                        tipo: tipo,
                        capturado: capturado}
                }) 
                return res.status(200).json(PokeCompleto)    
            } if (tipo === undefined && capturado === undefined) {                
                const PokeCompleto = await database.Pokemon.findAll( {
                    where: { 
                        nome: nome
                    }
                }) 
                return res.status(200).json(PokeCompleto)
            } if (nome === undefined && tipo === undefined) {                
                const PokeCompleto = await database.Pokemon.findAll( {
                    where: { 
                    capturado: capturado
            }
                })
                return res.status(200).json(PokeCompleto)
            } if (nome === undefined && capturado === undefined) {                
                const PokeCompleto = await database.Pokemon.findAll( {
                    where: { 
                        tipo: tipo
                }
                })
                return res.status(200).json(PokeCompleto)
            } if (tipo === undefined) {                
                const PokeCompleto = await database.Pokemon.findAll( {
                    where: { 
                        nome: nome,
                        capturado: capturado
                    }
                })
                return res.status(200).json(PokeCompleto)  
            } if (capturado === undefined) {                
                const PokeCompleto = await database.Pokemon.findAll( {
                    where: { 
                        nome: nome,
                        tipo: tipo
                    }
                })
                return res.status(200).json(PokeCompleto)
            } if (nome === undefined) {                
            const PokeCompleto = await database.Pokemon.findAll( {
                where: { 
                capturado: capturado,
                tipo: tipo
            }
            })
                return res.status(200).json(PokeCompleto)
}           
                    }
            })
            return res.status(200).json(Pokes)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async todoPoke(req, res) {
        try {
            const todosOsPoke = await database.Pokemon.findAll()
            return res.status(200).json(todosOsPoke)

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async apagaPoke(req, res) {
        const { id } = req.params
        try {
            await database.Pokemon.destroy( { where: { id: Number(id) } } )
            return res.status(200).json({ mensagem: `Pókemon de ID ${id} deletado`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async atualizaPoke(req, res) {
        const mudaPoke = req.body
        const { nomePoke } = req.params
        try {
            const atualPoke = await database.Pokemon.update(mudaPoke, { where: {nome: nomePoke}})
            return res.status(200).json({mensagem: `Pókemon ${nomePoke} atualizado. novas infos:`}, atualPoke)
            // ajustar mensagem de retorno que nao funcionou
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}




module.exports = PokeController