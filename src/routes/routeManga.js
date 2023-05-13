const express = require('express');
const connection = require("../db/connection");
const validateMangas = require('../middlewares/validateMangas');
const route = express.Router();

route.get('/', async (req, res) => {
    const [result] = await connection.execute('SELECT * FROM mangas');
    res.status(200).json(result);
});

route.post('/',validateMangas, async (req, res) => {
    const { id, nome, capitulos, paginas } = req.body;
    const [result] = await connection.execute(
        'INSERT INTO mangas(id, nome, capitulos, paginas) VALUES (?, ?, ?, ?)', [id, nome, capitulos, paginas]
    );
    const newManga = {
        id: result.insertId,
        nome,
        capitulos,
        paginas,
    };
    res.status(201).json(newManga);
});

route.put('/:id',validateMangas, async (req, res) => {
    const id = req.params.id;
    const {nome, capitulos, paginas } = req.body;

    const [result] = await connection.execute(
        'UPDATE capitulos SET nome = ?, capitulos = ?, paginas = ? WHERE id = ?', [ nome, capitulos, paginas, id]
    );

    if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Capítulo não encontrado.' });
    }

    const updatedManga = {
        id: parseInt(id),
        nome,
        capitulos,
        paginas
    };

    res.status(200).json(updatedManga);
});

route.delete('/:id', async (req, res) => {
    const id = req.params.id;

    const [result] = await connection.execute(
        'DELETE FROM mangas WHERE id = ?', [id]
    );

    if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Mangá não encontrado.' });
    }

    res.status(200).json({ message: `Manga com ID ${id} excluído.` });
});

module.exports = route;
