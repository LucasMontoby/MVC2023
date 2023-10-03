const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Configuración de la base de datos
mongoose.connect('mongodb://127.0.0.1:27017/Product', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', err => {
  console.error('Error de conexión a la base de datos:', err);
});

// Configuración de la aplicación
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Controladores
const homeController = require('./controllers/homeController');
const productRoutes = require("./routes/products")
const userRoutes = require("./routes/users")
const relationshipRoutes = require("./routes/relationshipRoutes")

app.use('/', productRoutes);
app.use('/', userRoutes);
app.use('/', relationshipRoutes)

// Rutas
app.get('/', homeController.index);

// Inicio del servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});

