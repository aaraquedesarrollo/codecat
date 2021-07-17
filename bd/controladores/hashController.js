const crypto = require("crypto");
const { crearError } = require("../../servidor/errores");
const Hash = require("../modelos/HashSchema");

const obtenerHash = async (hashUsuario) => {
  try {
    const hashObtenido = await Hash.findOne({ hash: hashUsuario });
    return hashObtenido;
  } catch (err) {
    throw crearError(`No se ha podido obtener el hash ${err.message}`);
  }
};

const borrarHash = async (hashUsuario) => {
  try {
    const hashEliminado = await Hash.findOneAndDelete({ hash: hashUsuario });
    if (!hashEliminado) {
      throw crearError("No existe este hash", 404);
    }
    return hashEliminado;
  } catch (err) {
    throw crearError(`No se ha podido borrar el hash ${err.message}`);
  }
};

const generarHash = async (idUsuario) => {
  try {
    const valoresAleatorios = crypto.randomBytes(40).toString("base64");
    const hashGenerado = crypto
      .createHash("sha256")
      .update(valoresAleatorios)
      .digest("hex");
    const registroCreado = await Hash.create({ hash: hashGenerado, idUsuario });
    return registroCreado;
  } catch (err) {
    throw crearError(
      `No se ha podido generar el hash del usuario ${err.message}`
    );
  }
};

module.exports = {
  generarHash,
  obtenerHash,
  borrarHash,
};
