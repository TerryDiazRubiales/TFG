const mongoose = require("mongoose");

const GeneroSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    definicion: {
        type: String,
        required: true
    },
    caracteristicas: {
        type: String,
        required: true
    },
},
{
    timestamps: true
});

module.exports = mongoose.model("Genero", GeneroSchema);