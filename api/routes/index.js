const bodyParser = require('body-parser');
const pokemons = require('./pokemonsRoute');
const treinadores = require('./treinadorRoute');

module.exports = (app) => {
  app.use(
    bodyParser.json(),
    pokemons,
    treinadores,
  );
};
