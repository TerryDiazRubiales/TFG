const mongoose = require("mongoose");

const OrientacionSexualSchema = new mongoose.Schema({
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

module.exports = mongoose.model("OrientacionSexual", OrientacionSexualSchema);