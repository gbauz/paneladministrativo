// models/Contacto.js
const mongoose = require('mongoose');

const Contacto = mongoose.model('contactos', {
  nombre: String,
  email: String,
  mensaje: String,
});

module.exports = Contacto;
