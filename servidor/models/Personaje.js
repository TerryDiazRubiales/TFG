const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PersonajeSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    fechaCumple: {
        type: String,
        required: true
    },
    historia: {
        type: String,
        required: true
    },
    curiosidades: {
        type: String,
        
    },
    genero: {
        type: Schema.Types.ObjectId,
        ref: "Genero",
        require: true
    },
    signoZodiacal: {
        type: Schema.Types.ObjectId,
        ref: "SignoZodiacal",
        require: true
    },
    orientacionSexual: {
        type: Schema.Types.ObjectId,
        ref: "OrientacionSexual",
        require:true
    },
    sexo: {
        type: Schema.Types.ObjectId,
        ref: "Sexo",
        require: true
    },
    romanticismo: {
        type: Schema.Types.ObjectId,
        ref: "Romanticismo",
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        require: true
    }
   
},
{
    timestamps: true
});

module.exports = mongoose.model("Personaje", PersonajeSchema);