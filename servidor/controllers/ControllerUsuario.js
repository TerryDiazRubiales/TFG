const Usuario = require("../models/Usuario");

class ControllerUsuario {

    async vip(req, res, next) {

        try {
            const usuario = await Usuario.findOneAndUpdate({ _id: req.user._id }, {vip: true}, { new: true });
            
            res.status(200).send(usuario);
          } catch (error) {
            next(error);
          }
     
      }

      async esvip(req, res, next) {

        try {
            const usuario = await Usuario.find({ _id: req.user._id });
            
            res.status(200).send(usuario);
          } catch (error) {
            next(error);
          }
     
      }

// final      
}

module.exports = new ControllerUsuario();