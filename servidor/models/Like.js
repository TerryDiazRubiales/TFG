const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new mongoose.Schema({
    personaje: {
        type: Schema.Types.ObjectId,
        ref: "Personaje",
        require: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        require: true
    },
},
{
    timestamps: true
});

module.exports = mongoose.model("Like", likeSchema);