const express = require("express");
const personaje = require("../controllers/ControllerPersonaje");
const routes = express.Router();

// Crear personaje
routes.post("/personaje/create", personaje.create);

// listar personajes
routes.get("/personaje/list", personaje.list);

// listar géneros
routes.get("/personaje/generos", personaje.generos);

module.exports = routes;