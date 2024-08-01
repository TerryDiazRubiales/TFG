const Personaje = require("../models/Personaje");

class ControllerPersonaje {
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

  async list (req, res, next) {

    try {
      

      const personajeList = await Personaje.find({}, (err, list) => {

        var personajes = {};
        list.forEach(personaje => {
          personajes[personaje.usuario] = personaje;
        });
        res.status(200).json(personajes)
      
      });

  } catch (error) {
    next(error);
  }

  }

}

module.exports = new ControllerPersonaje();
