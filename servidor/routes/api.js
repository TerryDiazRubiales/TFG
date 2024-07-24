const express = require("express");
const personaje = require("../controllers/ControllerPersonaje");
const routes = express.Router();

// Crear personaje
routes.post("/create", personaje.create);

module.exports = routes;