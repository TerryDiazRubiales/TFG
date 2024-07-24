const mongoose = require("mongoose");

const SignoZodiacalSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    rangoinicial: {
        type: String,
        required: true
    },
    rangofinal: {
        type: String,
        required: true
    },
},
{
    timestamps: true
});

module.exports = mongoose.model("SignoZodiacal", SignoZodiacalSchema);