const chalk = require("chalk");
const debug = require("debug")("codeCatAPI:servidor:errores");

const errorServidor = (error, puerto) => {
  debug(chalk.redBright.bold("El servidor no se a podido levantar "));
  if (error.code === "EADDRINUSE") {
    return debug(chalk.redBright.bold(`El puerto ${puerto} está ocupado.`));
  }
};

const error404 = (req, res, next) => {
  debug(chalk.redBright.bold("No se ha encontrado el recurso"));
  res.status(404).json({ error: true, mensaje: "Recurso no encontrado" });
};

const errorGeneral = (err, req, res, next) => {
  const { codigo } = err; /* || 500 */
  const mensaje = err.codigo ? err.message : "Ha habido un error general";
  debug(chalk.redBright.bold(err.message));
  res.status(codigo).json({ error: true, mensaje });
};

const crearError = (mensaje, codigoError) => {
  const error = new Error(mensaje);
  if (codigoError) {
    error.codigo = codigoError;
  } else {
    error.codigo = 500;
  }
  return error;
};

module.exports = {
  errorServidor,
  error404,
  errorGeneral,
  crearError,
};
