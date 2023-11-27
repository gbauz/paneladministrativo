// routes/contactoRoutes.js
const express = require('express');
const Contacto = require('../models/contacto');
const fs = require('fs');
const generarInforme = require('../informeCrud');

const router = express.Router();

router.post('/contacto', async (req, res) => {
  try {
    const contacto = new Contacto(req.body);
    await contacto.save();
    res.redirect('/crud');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al guardar el contacto.');
  }
});

router.post('/contacto/:id/eliminar', async (req, res) => {
  const contactoId = req.params.id;
  try {
    await Contacto.findByIdAndRemove(contactoId);
    res.redirect('/crud');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar el contacto.');
  }
});

router.get('/crud', async (req, res) => {
  try {
    const contactos = await Contacto.find();
    res.render('crud', { contactos });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener contactos.');
  }
});

router.get('/informeCrud', async (req, res) => {
  try {
    const contactos = await Contacto.find();
    await generarInforme(contactos);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=informe.pdf');
    res.setHeader('Content-Length', fs.statSync('informe.pdf').size);
    const pdfStream = fs.createReadStream('informe.pdf');
    pdfStream.pipe(res);
  } catch (error) {
    console.error('Error al generar el informe PDF:', error);
    res.status(500).send('Error al generar el informe PDF');
  }
});

module.exports = router;
