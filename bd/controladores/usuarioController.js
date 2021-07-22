const debug = require("debug")("codeCatAPI:bd:controladores:usuarioController");
const chalk = require("chalk");
const bcrypt = require("bcrypt");
const { crearError } = require("../../servidor/errores");
const Usuario = require("../modelos/Usuario");
const {
  enviarCorreoValidacion,
  enviarCorreoConstrenyaCambiada,
} = require("../../servidor/nodemailer/email");
const { generarHash, obtenerHash, borrarHash } = require("./hashController");

const obtenerUsuario = async (
  condicion,
  campo = "id",
  throwError = false,
  errorOnFound = false
) => {
  try {
    let usuarioObtenido = null;
    // eslint-disable-next-line default-case
    switch (campo) {
      case "id":
        usuarioObtenido = await Usuario.findById(condicion);
        break;
      case "username":
        usuarioObtenido = await Usuario.findOne({ username: condicion });
        break;
      case "email":
        usuarioObtenido = await Usuario.findOne({ email: condicion });
        break;
    }
    if (throwError) {
      if (errorOnFound) {
        if (usuarioObtenido) {
          throw crearError(`Ya existe un usuario con este ${campo}`, 403);
        }
      } else if (!usuarioObtenido)
        throw crearError(`No existe un usuario con este ${campo}`, 404);
    }
    return usuarioObtenido;
  } catch (err) {
    throw crearError(
      `No se ha podido obtener el usuario por ${campo} ${err.message}`
    );
  }
};

const crearUsuario = async (usuario) => {
  const { username, email, password } = usuario;
  let usuarioCreado;
  try {
    await obtenerUsuario(username, "username", true, true);
    await obtenerUsuario(email, "email", true, true);
    const passwordEncriptada = await bcrypt.hash(password, 10);
    usuarioCreado = await Usuario.create({
      ...usuario,
      password: passwordEncriptada,
    });
    const { hash } = await generarHash(usuarioCreado._id);
    enviarCorreoValidacion(email, hash);
    return usuarioCreado;
  } catch (err) {
    if (usuarioCreado) {
      await eliminarUsuario(usuarioCreado._id);
    }
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
    const existeUsuario = await obtenerUsuario(email, "email", true);
    const contraseñaGenerada = Math.random().toString(36).substring(0, 10);
    const passwordEncriptada = await bcrypt.hash(contraseñaGenerada, 10);
    enviarCorreoConstrenyaCambiada(email, contraseñaGenerada);
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
    throw err.codigo
      ? err
      : crearError("No se han podido comprobar las credenciales del usuario");
  }
};

const modificarUsuario = async (idUsuario, modificaciones) => {
  try {
    await obtenerUsuario(idUsuario, "id", true);
    await Usuario.findByIdAndUpdate(idUsuario, modificaciones);
    const usuarioModificado = await obtenerUsuario(idUsuario);
    return usuarioModificado;
  } catch (err) {
    throw err.codigo
      ? err
      : crearError(`No se ha podido modificar el usuario: ${err.message}`);
  }
};

const eliminarUsuario = async (idUsuario) => {
  try {
    await obtenerUsuario(idUsuario, "id", true);
    const usuarioEliminado = await Usuario.findByIdAndDelete(idUsuario);
    return usuarioEliminado;
  } catch (err) {
    throw err.codigo
      ? err
      : crearError(`No se ha podido eliminar el usuario: ${err.message}`);
  }
};

module.exports = {
  obtenerUsuario,
  crearUsuario,
  loginUsuario,
  modificarUsuario,
  eliminarUsuario,
  confirmarHash,
  generarNuevaContrasenya,
};
