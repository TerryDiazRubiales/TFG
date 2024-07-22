const express = require("express");
const db = require("./config/db");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Conectamos a la base de datos
class App {
  constructor() {
    this.express = express();

    this.database();

    this.express.use(bodyParser.json());
    // this.middlewares();
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

  // middlewares() {
  //   this.express.use(express.json());
  // }

  routes() {
    this.express.use("/auth", require("./routes/auth"));
  }
}
module.exports = new App().express;
