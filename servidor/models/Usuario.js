const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const UsuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      unique: true,
      required: true,
    },
    contrasena: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Hash la contraseña antes de guardarse en la base de datos
UsuarioSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("contrasena")) return next();

  try {
    const salt = bcrypt.genSaltSync(10);
    user.contrasena = bcrypt.hashSync(user.contrasena, salt);

    next();
  } catch (error) {
    return next(error);
  }
});

// Compare the given password with the hashed password in the database
UsuarioSchema.methods.comparePassword = async function (contrasena) {
  return bcrypt.compareSync(contrasena, this.contrasena);
};

const User = mongoose.model("Usuario", UsuarioSchema);

module.exports = User;
