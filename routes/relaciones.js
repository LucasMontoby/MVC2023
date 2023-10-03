const express = require('express');
const router = express.Router();
const relationshipController = require('../controllers/relationshipController');

// Ruta para crear una relación Product-User
router.post('/users/:userId/products', relationshipController.createProductForUser);

// Ruta para obtener productos de un usuario
router.get('/users/:userId/products', relationshipController.getProductsByUser);

// Ruta para crear una relación User-Product
router.post('/products/:productId/users', relationshipController.addUserToProduct);

// Ruta para obtener usuarios de un producto
router.get('/products/:productId/users', relationshipController.getUsersByProduct);

module.exports = router;
