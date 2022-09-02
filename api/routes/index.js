const bodyParser = require('body-parser')
const pokemons = require('./pokemonsRoute')

module.exports = app => {
    app.use(
        bodyParser.json(),
        pokemons)
}