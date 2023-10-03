exports.index = function(req, res) {
  res.render('home', {title: 'Mi página de inicio', body: 'Contenido de mi página'});
};

const Product = require('../models/Product');

exports.home = async (req, res) => {
  try {
    // Obtener los productos destacados (puedes definir tu propia lógica para esto)
    const featuredProducts = await Product.find({ isFeatured: true }).limit(10);

    res.render('home', { featuredProducts });
  } catch (error) {
    console.error('Error al cargar la página de inicio:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};
