// app.js

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

// Configuración de Mongoose y conexión a la base de datos
mongoose.connect('mongodb://127.0.0.1:27017/mi_basededatos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Configuración de Express
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Modelo de usuario
const User = mongoose.model('User', {
  username: String,
  password: String,
});

// Rutas
app.get('/', (req, res) => {
  res.redirect('/login'); // Redirige a la página de inicio de sesión al acceder a '/'
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  await user.save();
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    // Usuario autenticado
    res.redirect('/dashboard');
  } else {
    res.redirect('/login');
  }
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
