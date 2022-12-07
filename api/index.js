const express = require('express');
const routes = require('./routes');

const app = express();

const port = 3300;

routes(app);

app.listen(port, () => console.log(`O servidor está conectado na porta ${port}`));

module.exports = app;
