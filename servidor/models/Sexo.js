const mongoose = require("mongoose");

const SexoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
},
{
    timestamps: true
});

module.exports = mongoose.model("Sexo", SexoSchema);