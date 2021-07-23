require("dotenv").config();
const debug = require("debug")("codeCatAPI:servidor:middlewares");
const chalk = require("chalk");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { crearError } = require("./errores");

const authMiddleware = (req, res, next) => {
  if (!req.header("Authorization")) {
    const nuevoError = crearError("Peticion no autentificada", 403);
    return next(nuevoError);
  }
  const token = req.header("Authorization").split(" ")[1];
  try {
    const datosToken = jwt.verify(token, process.env.SECRET_JWT);
    const { idUsuario } = datosToken;
    req.idUsuario = idUsuario;
    next();
  } catch (e) {
    // Token incorrecto
    if (e.message.includes("expired")) {
      const nuevoError = crearError("Token caducado", 403);
      return next(nuevoError);
    }
    if (e.message.includes("invalid signature")) {
      const nuevoError = crearError("Firma del token invalida", 400);
      return next(nuevoError);
    }
    next(e);
  }
};
const validarErrores = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    const nuevoError = new Error(errores.array().map((error) => error.msg));
    debug(chalk.redBrigth.bold(nuevoError));
    nuevoError.codigo = 400;
    return next(nuevoError);
  }
  next();
};

module.exports = { authMiddleware, validarErrores };
