const Personaje = require("../models/Personaje");

class ControllerAuth {
  //Creación de personaje
  async create (req, res, next) {
   
    try {
        const personaje = new Personaje (req.body);
        await personaje.save();
        res.status(201).json(personaje);
        
    } catch (error) {
      next(error);
    }
  }

  // Registro
  async register(req, res, next) {
    const { nombre, email, contrasena } = req.body;
    try {
      const Personaje = new Personaje({ nombre, email, contrasena });
      await Personaje.save();
      res.json({ message: "Registration successful" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ControllerAuth();
