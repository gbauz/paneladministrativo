// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const fs = require('fs');
const generarInforme = require('./informeCrud');

// Importar módulos de rutas
const UserRoutes = require('./controls/userRoutes');
const ContactoRoutes = require('./controls/contactoRoutes');
const BusquedaRoutes = require('./controls/busquedaRoutes'); // Corrección

const app = express();
const port = process.env.PORT || 3000;

// Conectar a la base de datos
mongoose.connect('mongodb://127.0.0.1:27017/mi_basededatos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Configuraciones generales
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Rutas relacionadas con User
app.use('/', UserRoutes);

// Rutas relacionadas con Contacto
app.use('/', ContactoRoutes);

// Rutas de búsqueda
app.use('/', BusquedaRoutes); // Corrección
// Ruta principal
app.get('/', (req, res) => {
  res.redirect('/login');
});


// Configuración de otras rutas dashboard
app.get('/loadCrud', (req, res) => {
  res.render('crud');
});

app.get('/loadConsultas', (req, res) => {
  res.render('consultas');
});

// Ruta para generar informe PDF
app.get('/informeCrud', async (req, res) => {
  try {
    // Obtener los contactos antes de generar el informe
    const contactos = await Contacto.find();

    // Llamar a la función para generar el informe con los datos de los contactos
    await generarInforme(contactos);

    // Establecer los encabezados antes de enviar el archivo PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=informe.pdf');
    res.setHeader('Content-Length', fs.statSync('informe.pdf').size);

    // Crear un flujo de lectura desde el archivo PDF y enviarlo como respuesta
    const pdfStream = fs.createReadStream('informe.pdf');
    pdfStream.pipe(res);
  } catch (error) {
    console.error('Error al generar el informe PDF:', error);
    res.status(500).send('Error al generar el informe PDF');
  }
});

// Escuchar en el puerto especificado
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
