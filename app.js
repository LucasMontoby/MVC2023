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
const productController = require('./controllers/productController');
const userController = require('./controllers/userController');

// Rutas
app.get('/', homeController.index);

app.get('/products', productController.index);
app.get('/products/new', productController.new);
app.post('/products', productController.create);
app.get('/products/:id', productController.show);
app.get('/products/:id/edit', productController.edit);
app.post('/products/:id', productController.update);
app.post('/products/:id/delete', productController.delete);

app.get('/users', userController.index);
app.get('/users/new', userController.new);
app.post('/users', userController.create);
app.get('/users/:id', userController.show);
app.get('/users/:id/edit', userController.edit);
app.post('/users/:id', userController.update);
app.post('/users/:id/delete', userController.delete);

// Inicio del servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});