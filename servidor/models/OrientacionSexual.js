const mongoose = require("mongoose");

const OrientacionSexualSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
},
{
    timestamps: true
});

module.exports = mongoose.model("OrientacionSexual", OrientacionSexualSchema);