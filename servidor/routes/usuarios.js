const express = require("express");
const usuarios = require("../controllers/usuarioController");
const routes = express.Router();

// Registro de un usuario
routes.post('/auth/register', usuarios.create);

// // Ruta para obtener todos los productos registrados
// routes.get('/productos', productos.findAll);

// // Ruta para obtener un producto en particular
// routes.get('/producto/:id', productos.findOne);

// // Ruta para actualizar un producto completo
// routes.put('/producto/:id', productos.update);

// // Ruta para borrar un producto en particular
// routes.delete('/producto/:id', productos.delete);

module.exports = routes;
