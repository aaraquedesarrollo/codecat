const { crearError } = require("../../servidor/errores");
const Historial = require("../modelos/Historial");

const crearHistorial = (idUsuario) => {
  try {
    const historialCreado = Historial.create({ idUsuario });
    return historialCreado;
  } catch (err) {
    throw crearError("Ha habido un error creando el historial");
  }
};

const comprobarHistorialUsuario = (idUsuario) => {
  try {
    const historialCreado = Historial.create({ idUsuario });
    return historialCreado;
  } catch (err) {
    throw crearError("Ha habido un error creando el historial");
  }
};

module.exports = {
  crearHistorial,
};
