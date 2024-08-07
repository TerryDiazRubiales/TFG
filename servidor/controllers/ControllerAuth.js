const User = require("../models/Usuario");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

class ControllerAuth {
  //Logueo
  async login(req, res, next) {
    const { email, contrasena } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      console.log(contrasena);
      const passwordMatch = await user.comparePassword(contrasena);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      const token = jwt.sign({ userId: user._id }, db.JWT_SECRET, {
        expiresIn: "1 hour",
      });
      res.json({ token });
    } catch (error) {
      next(error);
    }
  }

  // Registro
  async register(req, res, next) {
    const { nombre, email, contrasena } = req.body;
    try {
      const user = new User({ nombre, email, contrasena });
      await user.save();
      res.json({ message: "Registration successful" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ControllerAuth();
