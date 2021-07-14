require("dotenv").config();
const debug = require("debug")("codeCatAPI:bd:conexion");
const chalk = require("chalk");
const mongoose = require("mongoose");

debug(chalk.green.bold("Conectando a la base de datos..."));
mongoose.connect(
  process.env.MONGODB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      debug(
        chalk.redBright.bold("No se ha podido conectar a la base de datos")
      );
      debug(chalk.redBright.bold(err.message));
      process.exit(1);
    }
    debug(chalk.green.bold("Conectado a la base de datos :)"));
  }
);
