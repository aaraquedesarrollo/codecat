const debug = require("debug")("codeCatAPI:bd:controladores:trabajoController");
const chalk = require("chalk");
const Trabajo = require("../modelos/TrabajoSchema");

const listarTrabajos = async () => {
  try {
    const listadoTrabajos = await Trabajo.find();
    return listadoTrabajos;
  } catch (err) {
    debug(chalk.redBright.bold("No se ha podido listar los trabajos"));
    debug(chalk.redBright.bold(err.message));
  }
};

const obtenerTrabajo = async (idTrabajo) => {
  try {
    const trabajoObtenido = await Trabajo.findById(idTrabajo);
    return trabajoObtenido;
  } catch (err) {
    const nuevoError = new Error(
      "No se ha podido obtener el listado de trabajos"
    );
    throw err.codigo ? err : nuevoError;
  }
};

const crearTrabajo = async (trabajo) => {
  try {
    const trabajoCreado = await Trabajo.create(trabajo);
    return trabajoCreado;
  } catch (err) {
    const nuevoError = new Error("No se ha podido crear el  trabajo");
    throw err.codigo ? err : nuevoError;
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
    const nuevoError = new Error("No se ha podido modificar el  trabajo");
    throw err.codigo ? err : nuevoError;
  }
};

const eliminarTrabajo = async (idTrabajo) => {
  try {
    const trabajoEliminado = await Trabajo.findByIdAndDelete(idTrabajo);
    return trabajoEliminado;
  } catch (err) {
    const nuevoError = new Error("No se ha podido eliminar el  trabajo");
    throw err.codigo ? err : nuevoError;
  }
};

module.exports = {
  eliminarTrabajo,
  modificarTrabajo,
  obtenerTrabajo,
  listarTrabajos,
  crearTrabajo,
};
