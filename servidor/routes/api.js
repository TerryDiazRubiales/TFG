const express = require("express");
const personaje = require("../controllers/ControllerPersonaje");
const routes = express.Router();
const { authenticate } = require("../middlewares/auth");

// Crear personaje
routes.post("/personaje/create", authenticate, personaje.create);

// Editar personaje
routes.patch("/personaje/:id", authenticate, personaje.edit);

// Borrar personaje
routes.delete("/personaje/:id", authenticate, personaje.delete);

// listar personajes
routes.get("/personaje/list",authenticate, personaje.list);

// listar géneros
routes.get("/personaje/generos",authenticate, personaje.generos);

// lista de sexo
routes.get("/personaje/sexo",authenticate, personaje.sexo);

// lista de signoZodiacales
routes.get("/personaje/signoZodiacal",authenticate, personaje.signoZodiacal);

// lista de orientacionSexual
routes.get("/personaje/orientacionSexual",authenticate, personaje.orientacionSexual);

// lista de romanticismo
routes.get("/personaje/romanticismo",authenticate, personaje.romanticismo);

// listar informacion
routes.get("/personaje/:id",authenticate, personaje.detail);

module.exports = routes;