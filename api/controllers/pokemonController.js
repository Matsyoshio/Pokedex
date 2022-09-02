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
        const busca = req.body
        try {
            const umPoke = await database.Pokemon.findOne( {
                where: {
                    nome: Object.values(busca)
                }
            })
            return res.status(200).json(umPoke)
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