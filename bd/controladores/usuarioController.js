const debug = require("debug")("codeCatAPI:bd:controladores:usuarioController");
const chalk = require("chalk");
const { crearError } = require("../../servidor/errores");
const Usuario = require("../modelos/UsuarioSchema");

const obtenerUsuario = async (idUsuario) => {
  try {
    const usuarioObtenido = await Usuario.findById(idUsuario);
    if (!usuarioObtenido) {
      throw crearError("No existe el usuario", 404);
    }
    return usuarioObtenido;
  } catch (err) {
    debug(chalk.redBright.bold("No se ha podido obtener el usuario"));
    const nuevoError = crearError(
      `No se ha podido obtener el usuario${err.message}`
    );
    throw err.codigo ? err : nuevoError;
  }
};

const validarUsuario = async (idUsuario) => {
  const existeUsuario = await Usuario.findById(idUsuario);
  if (!existeUsuario) {
    throw crearError("No existe el usuario", 404);
  }
  return true;
};

const crearUsuario = async (usuario) => {
  try {
    const usuarioCreado = await Usuario.create(usuario);
    return usuarioCreado;
  } catch (err) {
    debug(chalk.redBright.bold("No se ha podido crear el usuario"));
    const nuevoError = crearError(
      `No se ha podido crear el usuario${err.message}`
    );
    throw err.codigo ? err : nuevoError;
  }
};

const modificarUsuario = async (idUsuario, modificaciones) => {
  try {
    await validarUsuario();
    const usuarioModificado = await Usuario.findByIdAndUpdate(
      idUsuario,
      modificaciones
    );
    return usuarioModificado;
  } catch (err) {
    debug(chalk.redBright.bold("No se ha podido modificar el usuario"));
    const nuevoError = crearError(
      `No se ha podido modificar el usuario${err.message}`
    );
    throw err.codigo ? err : nuevoError;
  }
};

const eliminarUsuario = async (idUsuario) => {
  try {
    await validarUsuario();
    const usuarioEliminado = await Usuario.findByIdAndDelete(idUsuario);
    return usuarioEliminado;
  } catch (err) {
    debug(chalk.redBright.bold("No se ha podido eliminar el usuario"));
    const nuevoError = crearError(
      `No se ha podido eliminar el usuario${err.message}`
    );
    throw err.codigo ? err : nuevoError;
  }
};

const listarUsuarios = async () => {
  try {
    const listadoUsuarios = await Usuario.find();
    return listadoUsuarios;
  } catch (err) {
    debug(chalk.redBright.bold("No se ha podido listar a los usuarios"));
    const nuevoError = crearError(
      `No se ha podido listar a los usuarios${err.message}`
    );
    throw err.codigo ? err : nuevoError;
  }
};

module.exports = {
  obtenerUsuario,
  validarUsuario,
  crearUsuario,
  modificarUsuario,
  eliminarUsuario,
  listarUsuarios,
};
