const express = require("express");
const usuarios = require("./controller/UsuariosController");
const routes = express.Router();

// // Ruta para la creación de un producto
// routes.post('/producto', productos.create);

// // Ruta para obtener todos los productos registrados
// routes.get('/productos', productos.findAll);

// // Ruta para obtener un producto en particular
// routes.get('/producto/:id', productos.findOne);

// // Ruta para actualizar un producto completo
// routes.put('/producto/:id', productos.update);

// // Ruta para borrar un producto en particular
// routes.delete('/producto/:id', productos.delete);

module.exports = routes;
