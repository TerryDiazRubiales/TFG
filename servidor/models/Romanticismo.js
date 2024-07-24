const mongoose = require("mongoose");

const RomanticismoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
},
{
    timestamps: true
});

module.exports = mongoose.model("Romanticismo", RomanticismoSchema);