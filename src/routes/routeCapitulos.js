const express = require('express');
const connection = require("../db/connection");
const validateCapitulo = require('../middlewares/validateCapitulo');
const route = express.Router();

route.get('/', async (req, res) => {
    const [result] = await connection.execute('SELECT * FROM capitulos');
    res.status(200).json(result);
});

route.post('/',validateCapitulo, async (req, res) => {
    const { id, titulo, numero, paginas } = req.body;
    const [result] = await connection.execute(
        'INSERT INTO capitulos(titulo, numero, paginas) VALUES (?, ?, ?)', [id, titulo, numero, paginas]
    );
    const newCapitulo = {
        id: result.insertId,
        titulo,
        numero,
        paginas
    };
    res.status(201).json(newCapitulo);
});

route.put('/:id', validateCapitulo, async (req, res) => {
    const id = req.params.id;
    const { titulo, numero, paginas } = req.body;

    const [result] = await connection.execute(
        'UPDATE capitulos SET titulo = ?, numero = ?, paginas = ? WHERE id = ?', [titulo, numero, paginas, id]
    );

    if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Capítulo não encontrado.' });
    }

    const updatedCapitulo = {
        id: parseInt(id),
        titulo,
        numero,
        paginas
    };

    res.status(200).json(updatedCapitulo);
});

module.exports = route;
