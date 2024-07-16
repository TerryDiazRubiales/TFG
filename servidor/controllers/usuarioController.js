const Usuario = require("../models/Usuarios");

class UsuariosController {
    // Crea un nuevo usuario
    async create(req, res) {
        try {
            const data = await Usuario.create(req.body);
            return res.json(data);
        } catch (err) {
            res.status(500).send({
                message:
                    err.message || "Error al realizar la creación del usuario"
            });
        }
    }
}

module.exports = new UsuariosController();