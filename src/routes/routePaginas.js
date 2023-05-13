const express = require('express');
const connection = require("../db/connection");
const validatePagina = require('../middlewares/validatePagina');
const route = express.Router();


route.get('/', async (req, res) => {
    const [result] = await connection.execute('SELECT * FROM paginas');
    res.status(200).json(result);
});

route.post('/',validatePagina, async (req, res) => {
    const {id, numero, paginas } = req.body;
    const [result] = await connection.execute(
        'INSERT INTO paginas(numero, paginas) VALUES (?, ?, ?)', [id, numero, paginas]
    );
    const newPagina = {
        id: result.insertId,
        numero,
        paginas
    };
    res.status(201).json(newPagina);
});

route.put('/:id',validatePagina, async (req, res) => {
    const id = req.params.id;
    const { numero, paginas } = req.body;

    const [result] = await connection.execute(
        'UPDATE paginas SET numero = ?, paginas = ? WHERE id = ?', [numero, paginas, id]
    );

    if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Página não encontrada.' });
    }

    const updatedPagina = {
        id: parseInt(id),
        numero,
        paginas
    };

    res.status(200).json(updatedPagina);
});

module.exports = route;