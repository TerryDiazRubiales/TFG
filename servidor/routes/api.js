const express = require("express");
const personaje = require("../controllers/ControllerPersonaje");
const usuario = require("../controllers/ControllerUsuario");
const routes = express.Router();
const { authenticate } = require("../middlewares/auth");

// Crear personaje
routes.post("/personaje/create", authenticate, personaje.create);

// ranking
routes.get("/personaje/ranking",authenticate, personaje.ranking);

// Editar personaje
routes.patch("/personaje/:id", authenticate, personaje.edit);

// Borrar personaje
routes.delete("/personaje/:id", authenticate, personaje.delete);

// listar personajes
routes.get("/personaje/list",authenticate, personaje.list);

// buscar personajes
routes.get("/personaje/buscar",authenticate, personaje.search);

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

// like
routes.post("/personaje/like",authenticate, personaje.like);

// unlike
routes.post("/personaje/unlike",authenticate, personaje.unlike);

// usuarios vip
routes.post("/usuario/vip",authenticate, usuario.vip);

// si es vip
routes.get("/usuario/esVip",authenticate, usuario.esvip);

module.exports = routes;