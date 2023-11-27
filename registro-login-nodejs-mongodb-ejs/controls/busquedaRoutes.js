// busquedaRoutes.js
const express = require('express');
const Contacto = require('../models/contacto');

const router = express.Router();

router.get('/busqueda', async (req, res) => {
  res.render('busqueda', { users: [], searched: false });
});

router.get('/buscar', async (req, res) => {
  const searchTerm = req.query.search;

  try {
    const users = await Contacto.find({
      $or: [
        { nombre: { $regex: searchTerm, $options: 'i' } }, // Buscar por nombre
        { apellido: { $regex: searchTerm, $options: 'i' } }, // Buscar por apellido
      ],
    });

    res.render('busqueda', { users, searched: true });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al realizar la búsqueda.');
  }
});

module.exports = router;
