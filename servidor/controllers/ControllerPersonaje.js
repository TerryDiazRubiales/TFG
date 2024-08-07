const Genero = require("../models/Genero");
const Personaje = require("../models/Personaje");
const Sexo = require("../models/Sexo");
const SignoZodiacal = require("../models/SignoZodiacal");
const OrientacionSexual = require("../models/OrientacionSexual");
const Romanticismo = require("../models/Romanticismo");

class ControllerPersonaje {

  //Creación de personaje
  async create(req, res, next) {

  try {
    
    const personaje = new Personaje({
      ...req.body,
      usuario: req.user._id
    });
    await personaje.save();
    res.status(201).json(personaje);

  } catch (error) {
    next(error);
  }
}

  async list(req, res, next) {

  try {

    const personajesList = await Personaje.where({
      usuario: req.user

    });
    res.status(200).send(personajesList);

  } catch (error) {
    next(error);
  }

}

  async generos(req, res, next) {

  try {
    const generosList = await Genero.find();
    res.status(200).send(generosList);
  } catch (error) {
    next(error);
  }

}

  async sexo(req, res, next) {

  try {
    const sexoList = await Sexo.find();
    res.status(200).send(sexoList);
  } catch (error) {
    next(error);
  }
}

  async signoZodiacal(req, res, next) {

  try {
    const signoZodiacalList = await SignoZodiacal.find();
    res.status(200).send(signoZodiacalList);
  } catch (error) {
    next(error);
  }

}

  async orientacionSexual(req, res, next) {

  try {
    const orientacionSexualList = await OrientacionSexual.find();
    res.status(200).send(orientacionSexualList);
  } catch (error) {
    next(error);
  }

}

  async romanticismo(req, res, next) {

  try {
    const romanticismoList = await Romanticismo.find();
    res.status(200).send(romanticismoList);
  } catch (error) {
    next(error);
  }

}

}



module.exports = new ControllerPersonaje();
