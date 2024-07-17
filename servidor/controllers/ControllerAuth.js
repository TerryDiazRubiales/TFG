const User = require("../models/Usuario");

class ControllerAuth {
    
    //Logueo
    async login (req, res, next) {
        const { nombre, contrasena} = req.body;
      
        try {
          const user = await User.findOne({ nombre });
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          const passwordMatch = await user.comparePassword(contrasena);
          if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
          }
      
          const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
            expiresIn: '1 hour'
          });
          res.json({ token });
        } catch (error) {
          next(error);
        }
      };

      // Registtro
      async register (req, res, next) {
        const { nombre, email, contrasena } = req.body;
      
        try {
          const hashedPassword = await bcrypt.hash(contrasena, 10);
          const user = new User({ nombre, email, contrasena: hashedPassword });
          await user.save();
          res.json({ message: 'Registration successful' });
        } catch (error) {
          next(error);
        }
      };

}

module.exports = new ControllerAuth();