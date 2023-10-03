// routes/relationshipRoutes.js
const express = require('express');
const router = express.Router();
const relationshipController = require('../controllers/relationshipController');

// Ruta para mostrar las relaciones entre usuarios y productos
router.get('/products/:productId/users', relationshipController.getUsersByProduct);

module.exports = router;


