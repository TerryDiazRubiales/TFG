const Genero = require("../models/Genero");
const Personaje = require("../models/Personaje");
const Sexo = require("../models/Sexo");
const SignoZodiacal = require("../models/SignoZodiacal");
const OrientacionSexual = require("../models/OrientacionSexual");
const Romanticismo = require("../models/Romanticismo");
const Like = require("../models/Like");
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
      usuario: req.user._id

    });
    res.status(200).send(personajesList);

  } catch (error) {
    next(error);
  }

}

async search(req, res, next) {

  console.log(req.query.q);

  try {
    const q = req.query.q;
    const regex = new RegExp(q, 'i') // i for case insensitive

    const personajesList = await Personaje.find({nombre: {$regex: regex}})
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

async detail(req, res, next) {

  try {
    let detailList = await Personaje.findById(req.params.id).populate(['genero','sexo', 'orientacionSexual','signoZodiacal', 'romanticismo']).exec();
    
    const likes = await Like.where({personaje: req.params.id}).countDocuments();
    
    // Te da el like de un usuario y contamos cuantos ha sido para bloquearlo si ya tiene uno
    const userLike = await Like.where({
      personaje: req.params.id,
      usuario: req.user._id
    }).countDocuments();

    res.status(200).send({detailList, likes, userLike});
  } catch (error) {
    next(error);
  }

}


async edit(req, res, next) {

  try {
    const detailList = await Personaje.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    
    res.status(200).send(detailList);
  } catch (error) {
    next(error);
  }

}


async delete(req, res, next) {

  try {
    
    const detailList = await Personaje.findOneAndDelete({ _id: req.params.id });
    
    res.status(200).send(detailList);
  } catch (error) {
    next(error);
  }

}

async like(req, res, next) {

  try {
    
    const like = new Like({
      usuario: req.body.usuario,
      personaje: req.body.personaje
      
    });
    await like.save();
    res.status(200).send({
      error: '200',
      message: 'Like OK'
    });
    
  } catch (error) {
    next(error);
  }

}

async unlike(req, res, next) {
  try {
    
    const unlike = await Like.findOneAndDelete(
      { usuario: req.body.usuario,
        personaje: req.body.personaje
      }
    );
    
    res.status(200).send({
      error: '200',
      message: 'Unlike OK'
    });
    
  } catch (error) {
    next(error);
  }

}


}



module.exports = new ControllerPersonaje();
