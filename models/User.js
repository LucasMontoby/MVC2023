// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  // Agregar un campo para almacenar las referencias a productos que pertenecen al usuario
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
});

module.exports = mongoose.model('User', userSchema);
