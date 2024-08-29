const express = require("express");
const db = require("./config/db");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


const authRouter = require("./routes/auth");
const apiRouter = require("./routes/api");
const cors = require("cors");

// Conectamos a la base de datos
class App {
  constructor() {
       
    this.express = express();
    this.express.use(cors());
    this.database();

    this.express.use(bodyParser.json());
    
    this.routes();

    this.express.listen(2202, () =>
      console.log(`API REST con mongo DB ejecutando en el puerto 2202 `)
    );
    this.express.get("/", (req, res) => {
      res.send("Hello World!");
    });
  }

  async database() {
    await mongoose.connect(db.uri, { useNewUrlParser: true });
  }

  routes() {
    this.express.use(["/auth", "/api"], [authRouter, apiRouter]);
  }
}
module.exports = new App().express;
