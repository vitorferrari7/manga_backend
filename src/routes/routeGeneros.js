const express = require('express');
const connection = require('../db/connection');
const route = express.Router();
const validateGenero = require('../middlewares/validateGenero');

route.get('/', async (req, res) => {
  try {
    const [result] = await connection.execute('SELECT * FROM genero');
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar os gêneros.' });
  }
});

route.post('/', validateGenero, async (req, res) => {
  const { id, nome } = req.body;

  try {
    await connection.execute('INSERT INTO genero (id, nome) VALUES (?, ?)', [id, nome]);
    const newGenero = { id, nome };
    res.status(201).json(newGenero);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar o gênero.' });
  }
});


route.put('/:id',validateGenero, async (req, res) => {
  const id = req.params.id;
  const { nome } = req.body;

  try {
    const [result] = await connection.execute('UPDATE genero SET nome = ? WHERE id = ?', [nome, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Gênero não encontrado.' });
    }

    const updatedGenero = { id, nome };
    res.status(200).json(updatedGenero);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar o gênero.' });
  }
});

module.exports = route;
