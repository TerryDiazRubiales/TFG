const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    contrasena: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
},
{
    timestamps: true
});

module.exports = mongoose.model("Usuario", UsuarioSchema);