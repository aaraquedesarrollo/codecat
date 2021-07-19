const debug = require("debug")("codeCatAPI:bd:controladores:nivelController");
const chalk = require("chalk");
const { crearError } = require("../../servidor/errores");

const Nivel = require("../modelos/Nivel");

const listarNiveles = async () => {
  try {
    const nivelesListados = await Nivel.find();
    return nivelesListados;
  } catch (err) {
    debug(chalk.redBright.bold("No se han podido listar los Niveles"));
    const nuevoError = crearError(
      `No se han podido listar los Niveles ${err.message}`
    );
    throw nuevoError;
  }
};

module.exports = { listarNiveles };
