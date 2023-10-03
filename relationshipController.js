// relationshipController.js

const Product = require('../models/Product');
const User = require('../models/User');

// Crear una relación Product-User
exports.createProductForUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      createdBy: userId,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Error al crear la relación Product-User:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Obtener productos de un usuario
exports.getProductsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const products = await Product.find({ createdBy: userId });
    res.status(200).json(products);
  } catch (error) {
    console.error('Error al obtener productos por usuario:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Crear una relación User-Product
exports.addUserToProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const userId = req.body.userId;
    product.users.push(userId);
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    console.error('Error al crear la relación User-Product:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

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
    res.status(200).json(users);
  } catch (error) {
    console.error('Error al obtener usuarios por producto:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};


// Explicación del código en detalle:

// El código proporcionado es un controlador llamado `relationshipController` que se encarga de gestionar relaciones entre modelos en una aplicación Node.js con MongoDB. Este controlador maneja tanto las relaciones `Product`-`User` como `User`-`Product`. A continuación, describo cada una de las funciones y cómo se utilizan:

// 1. createProductForUser: Este controlador maneja la creación de una relación en la dirección `Product`-`User`. Toma el ID del usuario (`userId`) de los parámetros de la solicitud y crea un nuevo producto relacionado con ese usuario. Luego, guarda el producto en la base de datos con el ID del usuario en el campo `createdBy`. Si el usuario no existe, responde con un código de estado 404 (No encontrado). Si ocurre un error durante la creación, responde con un código de estado 500 (Error del servidor).

// 2. getProductsByUser: Este controlador obtiene todos los productos relacionados con un usuario específico. Toma el ID del usuario (`userId`) de los parámetros de la solicitud y busca todos los productos que tienen el mismo ID de usuario en el campo `createdBy`. Luego, responde con la lista de productos encontrados. Si el usuario no existe, responde con un código de estado 404. Si ocurre un error durante la búsqueda, responde con un código de estado 500.

// 3. addUserToProduct: Este controlador maneja la creación de una relación en la dirección `User`-`Product`. Toma el ID del producto (`productId`) de los parámetros de la solicitud y el ID del usuario (`userId`) del cuerpo de la solicitud. Luego, agrega el ID del usuario al campo `users` del producto y guarda el producto actualizado en la base de datos. Si el producto no existe, responde con un código de estado 404. Si ocurre un error durante la creación, responde con un código de estado 500.

// 4. getUsersByProduct: Este controlador obtiene todos los usuarios relacionados con un producto específico. Toma el ID del producto (`productId`) de los parámetros de la solicitud, busca los IDs de usuario en el campo `users` del producto y luego busca los usuarios correspondientes. Finalmente, responde con la lista de usuarios encontrados. Si el producto no existe, responde con un código de estado 404. Si ocurre un error durante la búsqueda, responde con un código de estado 500.
