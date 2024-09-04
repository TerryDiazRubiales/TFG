const mongoose = require("mongoose");

const generoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
},
{
    timestamps: true
});

module.exports = mongoose.model("Genero", generoSchema);