// controllers/relationshipController.js
const Product = require('../models/Product');
const User = require('../models/User');

// Obtener usuarios de un producto
exports.getUsersByProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const userIds = product.users;
    const users = await User.find({ _id: { $in: userIds } });

    // Renderiza una vista para mostrar los usuarios relacionados con el producto
    res.render('productUsers', { product, users });
  } catch (error) {
    console.error('Error al obtener usuarios por producto:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};


