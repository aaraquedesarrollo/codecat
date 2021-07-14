const debug = require("debug")("codeCatAPI:bd:controladores:usuarioController");
const chalk = require("chalk");
const Usuario = require("../modelos/UsuarioSchema");

const obtenerUsuario = async (idUsuario) => {
  try {
    const usuarioObtenido = await Usuario.findById(idUsuario);
    return usuarioObtenido;
  } catch (err) {
    debug(chalk.redBright.bold("No se ha podido obtener el usuario"));
    debug(chalk.redBright.bold(err.message));
  }
};

const crearUsuario = async (usuario) => {
  try {
    const usuarioCreado = await Usuario.create(usuario);
    return usuarioCreado;
  } catch (err) {
    debug(chalk.redBright.bold("No se ha podido crear el usuario"));
    debug(chalk.redBright.bold(err.message));
  }
};

const modificarUsuario = async (idUsuario, modificaciones) => {
  try {
    const usuarioModificado = await Usuario.findByIdAndUpdate(
      idUsuario,
      modificaciones
    );
    return usuarioModificado;
  } catch (err) {
    debug(chalk.redBright.bold("No se ha podido modificar el usuario"));
    debug(chalk.redBright.bold(err.message));
  }
};

const eliminarUsuario = async (idUsuario) => {
  try {
    const usuarioEliminado = await Usuario.findByIdAndDelete(idUsuario);
    return usuarioEliminado;
  } catch (err) {
    debug(chalk.redBright.bold("No se ha podido eliminar el usuario"));
    debug(chalk.redBright.bold(err.message));
  }
};

const listarUsuarios = async () => {
  try {
    const listadoUsuarios = await Usuario.find();
    return listadoUsuarios;
  } catch (err) {
    debug(chalk.redBright.bold("No se ha podido listar a los usuarios"));
    debug(chalk.redBright.bold(err.message));
  }
};

module.exports = {
  obtenerUsuario,
  crearUsuario,
  modificarUsuario,
  eliminarUsuario,
  listarUsuarios,
};
