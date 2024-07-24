const User = require("../models/Usuario");
const jwt = require("jsonwebtoken");

const JWT_SECRET =
  "4b4ebe4e06ac0aec02f4fe5a45a4e1f4e4a0bb5b09211707549e714c0f0c6683";

class ControllerAuth {
  //Logueo
  async login(req, res, next) {
    const { nombre, contrasena } = req.body;

    try {
      const user = await User.findOne({ nombre });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
//
      const passwordMatch = await user.comparePassword(contrasena);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
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
