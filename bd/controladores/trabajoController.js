const { crearError } = require("../../servidor/errores");
const Trabajo = require("../modelos/TrabajoSchema");

const listarTrabajos = async () => {
  try {
    const listadoTrabajos = await Trabajo.find().populate("tareas");
    return listadoTrabajos;
  } catch (err) {
    const nuevoError = crearError(
      `No se ha podido obtener el listado de trabajos: ${err.message}`
    );
    throw nuevoError;
  }
};

const obtenerTrabajo = async (idTrabajo) => {
  try {
    const trabajoObtenido = await Trabajo.findById(idTrabajo).populate(
      "tareas"
    );
    return trabajoObtenido;
  } catch (err) {
    const nuevoError = crearError("No se ha podido obtener el trabajo");
    throw nuevoError;
  }
};

const crearTrabajo = async (trabajo) => {
  try {
    const trabajoCreado = await Trabajo.create(trabajo);
    return trabajoCreado;
  } catch (err) {
    const nuevoError = crearError("No se ha podido crear el  trabajo");
    throw nuevoError;
  }
};

const modificarTrabajo = async (idTrabajo, modificaciones) => {
  try {
    const trabajoModificado = await Trabajo.findByIdAndUpdate(
      idTrabajo,
      modificaciones
    );
    return trabajoModificado;
  } catch (err) {
    const nuevoError = crearError("No se ha podido modificar el  trabajo");
    throw nuevoError;
  }
};

const eliminarTrabajo = async (idTrabajo) => {
  try {
    const trabajoEliminado = await Trabajo.findByIdAndDelete(idTrabajo);
    return trabajoEliminado;
  } catch (err) {
    const nuevoError = crearError("No se ha podido eliminar el  trabajo");
    throw nuevoError;
  }
};

module.exports = {
  eliminarTrabajo,
  modificarTrabajo,
  obtenerTrabajo,
  listarTrabajos,
  crearTrabajo,
};
