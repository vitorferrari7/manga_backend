require('dotenv').config();
const express = require('express');
const{ routeCapitulos, routePaginas, routeManga, routeGeneros } = require('./routes');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

app.use(express.json());

app.use('/capitulos', routeCapitulos);

app.use('/genero', routeGeneros);

app.use('/paginas', routePaginas);

app.use('/mangas', routeManga);


app.use(errorMiddleware);

module.exports = {
    app,
}
