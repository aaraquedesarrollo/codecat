const debug = require("debug")("codeCatAPI:bd:controladores:usuarioController");
const chalk = require("chalk");
const bcrypt = require("bcrypt");
const { crearError } = require("../../servidor/errores");
const Usuario = require("../modelos/Usuario");
const { enviarCorreoValidacion } = require("../../servidor/nodemailer/email");
const { generarHash, obtenerHash, borrarHash } = require("./hashController");

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
      `No se ha podido obtener el usuario: ${err.message}`
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
  let usuarioCreado;
  try {
    const passwordEncriptada = await bcrypt.hash(usuario.password, 10);
    usuarioCreado = await Usuario.create({
      ...usuario,
      password: passwordEncriptada,
    });
    const hashUsuario = await generarHash(usuarioCreado._id);
    await enviarCorreoValidacion(usuarioCreado.email, hashUsuario.hash);
    return usuarioCreado;
  } catch (err) {
    let nuevoError;
    if (err.message.includes("username")) {
      nuevoError = crearError("El nombre de usuario ya existe", 403);
    } else if (err.message.includes("email")) {
      nuevoError = crearError("El email usado ya existe", 403);
    } else {
      nuevoError = crearError(
        `No se ha podido crear el usuario: ${err.message}`
      );
    }
    debug(chalk.redBright.bold("No se ha podido crear el usuario"));
    throw err.codigo ? err : nuevoError;
  }
};

const confirmarHash = async (hashUsuario) => {
  try {
    const existeHash = await obtenerHash(hashUsuario);
    if (!existeHash) {
      throw crearError("No existe un usuario con este hash", 403);
    }
    await modificarUsuario(existeHash.idUsuario, { activo: true });
    borrarHash(existeHash.hash);
  } catch (err) {
    throw crearError(`No se ha podido confirmar el hash ${err.message}`);
  }
};

const loginUsuario = async (username, password) => {
  try {
    const usuarioEncontrado = await Usuario.findOne({
      $or: [{ email: username }, { username }],
    });
    if (!usuarioEncontrado) {
      throw crearError("Credenciales incorrectas", 400);
    }
    const contrasenyaCoincide = await bcrypt.compare(
      password,
      usuarioEncontrado.password
    );
    if (!contrasenyaCoincide) {
      throw crearError("Credenciales incorrectas", 400);
    }
    if (!usuarioEncontrado.activo) {
      throw crearError("El usuario no esta verificado", 403);
    }
    return usuarioEncontrado._id;
  } catch (err) {
    debug(
      chalk.redBright.bold(
        "No se han podido comprobar las credenciales del usuario"
      )
    );
    const nuevoError = crearError(
      "No se han podido comprobar las credenciales del usuario"
    );
    throw err.codigo ? err : nuevoError;
  }
};

const modificarUsuario = async (idUsuario, modificaciones) => {
  try {
    await validarUsuario(idUsuario);
    const usuarioModificado = await Usuario.findByIdAndUpdate(
      idUsuario,
      modificaciones
    );
    return usuarioModificado;
  } catch (err) {
    debug(chalk.redBright.bold("No se ha podido modificar el usuario"));
    const nuevoError = crearError(
      `No se ha podido modificar el usuario: ${err.message}`
    );
    throw err.codigo ? err : nuevoError;
  }
};

const eliminarUsuario = async (idUsuario) => {
  try {
    await validarUsuario(idUsuario);
    const usuarioEliminado = await Usuario.findByIdAndDelete(idUsuario);
    return usuarioEliminado;
  } catch (err) {
    debug(chalk.redBright.bold("No se ha podido eliminar el usuario"));
    const nuevoError = crearError(
      `No se ha podido eliminar el usuario: ${err.message}`
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
      `No se ha podido listar a los usuarios: ${err.message}`
    );
    throw err.codigo ? err : nuevoError;
  }
};

module.exports = {
  obtenerUsuario,
  validarUsuario,
  crearUsuario,
  loginUsuario,
  modificarUsuario,
  eliminarUsuario,
  listarUsuarios,
  confirmarHash,
};
