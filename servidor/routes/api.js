const express = require("express");
const personaje = require("../controllers/ControllerPersonaje");
const routes = express.Router();

// Crear personaje
routes.post("/personaje/create", personaje.create);

// listar personajes
routes.get("/personaje/list", personaje.list);

// listar géneros
routes.get("/personaje/generos", personaje.generos);

// lista de sexo
routes.get("/personaje/sexo", personaje.sexo);

// lista de signoZodiacales
routes.get("/personaje/signoZodiacal", personaje.signoZodiacal);

// lista de orientacionSexual
routes.get("/personaje/orientacionSexual", personaje.orientacionSexual);

// lista de romanticismo
routes.get("/personaje/romanticismo", personaje.romanticismo);

module.exports = routes;