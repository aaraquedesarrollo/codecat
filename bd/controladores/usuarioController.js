const debug = require("debug")("codeCatAPI:bd:controladores:usuarioController");
const chalk = require("chalk");
const bcrypt = require("bcrypt");
const { crearError } = require("../../servidor/errores");
const Usuario = require("../modelos/Usuario");
const {
  enviarCorreoValidacion,
  enviarCorreoNuevaContrasenya,
} = require("../../servidor/nodemailer/email");
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

const validarUsuarioPorId = async (idUsuario) => {
  const existeUsuario = await Usuario.findById(idUsuario);
  if (!existeUsuario) {
    throw crearError("No existe un usuario con esta ID", 404);
  }
  return existeUsuario;
};

const validarUsuarioPorEmail = async (email) => {
  const existeUsuario = await Usuario.findOne({ email });
  if (!existeUsuario) {
    throw crearError("No existe un usuario con este email", 403);
  }
  return existeUsuario;
};

const existeUsuarioRepetidoPorUsername = async (username) => {
  const existeUsuario = await Usuario.findOne({ username });
  if (!existeUsuario) {
    throw crearError("Ya existe un usuario con este nombre de usuario", 403);
  }
  return true;
};

const existeUsuarioRepetidoPorEmail = async (email) => {
  const existeUsuario = await Usuario.findOne({ email });
  if (existeUsuario) {
    throw crearError("Ya existe un usuario con este email", 403);
  }
  return true;
};

const crearUsuario = async (usuario) => {
  const { username, email, password, _id } = usuario;
  let usuarioCreado;
  try {
    existeUsuarioRepetidoPorUsername(username);
    existeUsuarioRepetidoPorEmail(email);
    const passwordEncriptada = await bcrypt.hash(password, 10);
    usuarioCreado = await Usuario.create({
      ...usuario,
      password: passwordEncriptada,
    });
    const { hash } = await generarHash(_id);
    enviarCorreoValidacion(email, hash);
    return usuarioCreado;
  } catch (err) {
    if (usuarioCreado) {
      await eliminarUsuario(usuarioCreado._id);
    }
    debug(chalk.redBright.bold("No se ha podido crear el usuario"));
    throw err.codigo
      ? err
      : crearError(`No se ha podido crear el usuario: ${err.message}`);
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

const generarNuevaContrasenya = async (email) => {
  try {
    const existeUsuario = await validarUsuarioPorEmail(email);
    const contraseñaGenerada = Math.random().toString(36).substring(0, 10);
    const passwordEncriptada = await bcrypt.hash(contraseñaGenerada, 10);
    enviarCorreoNuevaContrasenya(email, contraseñaGenerada);
    await modificarUsuario(existeUsuario._id, { password: passwordEncriptada });
  } catch (err) {
    throw err.codigo
      ? err
      : crearError(
          `No se ha podido generar una nueva contraseña: ${err.message}`
        );
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
    await validarUsuarioPorId(idUsuario);
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
    await validarUsuarioPorId(idUsuario);
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
  validarUsuarioPorId,
  crearUsuario,
  loginUsuario,
  modificarUsuario,
  eliminarUsuario,
  listarUsuarios,
  confirmarHash,
  generarNuevaContrasenya,
};
