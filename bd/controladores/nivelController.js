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
const obtenerNivelUsuario = async (experiencia) => {
  try {
    const nivel = await Nivel.find({
      experiencia: { $lte: experiencia },
    })
      .sort([["experiencia", -1]])
      .limit(1);
    if (!nivel) {
      throw crearError("No se a encontrado el nivel de usuario", 404);
    }
    return nivel[0];
  } catch (err) {
    const nuevoError = crearError(
      `No se han podido obtener el nivel de usuario ${err.message}`
    );
    throw err.codigo ? err : nuevoError;
  }
};

module.exports = { listarNiveles, obtenerNivelUsuario };
