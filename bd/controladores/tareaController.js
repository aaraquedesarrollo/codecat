const debug = require("debug")("codeCatAPI:bd:controladores:tareaController");
const chalk = require("chalk");
const { crearError } = require("../../servidor/errores");
const Tarea = require("../modelos/Tarea");

const listarTareas = async () => {
  try {
    const tareasListadas = await Tarea.find();
    return tareasListadas;
  } catch (err) {
    debug(chalk.redBright.bold("No se han podido listar las tareas"));
    const nuevoError = crearError(
      `No se han podido listar las tareas ${err.message}`
    );
    throw nuevoError;
  }
};

const obtenerTarea = async (idTarea, idUsuario) => {
  try {
    const tareaObtenida = await Tarea.findById(idTarea);
    if (!tareaObtenida) {
      throw crearError("No existen la tarea", 404);
    }
    return tareaObtenida;
  } catch (err) {
    debug(chalk.redBright.bold("No se ha podido obtener la tarea"));
    const nuevoError = crearError(
      `No se ha podido obtener la tarea ${err.message}`
    );
    throw err.codigo ? err : nuevoError;
  }
};

const crearTarea = async (trabajo) => {
  try {
    const tareaCreada = await Tarea.create(trabajo);
    return tareaCreada;
  } catch (err) {
    debug(chalk.redBright.bold("No se ha podido crear la tarea"));
    const nuevoError = crearError(
      `No se ha podido crear la tarea ${err.message}`
    );
    throw nuevoError;
  }
};

const modificarTarea = async (idTarea, modificaciones) => {
  try {
    const tareaModificada = await Tarea.findByIdAndUpdate(
      idTarea,
      modificaciones
    );
    if (!tareaModificada) {
      throw crearError("No existe la tarea a modificar", 404);
    }
    return tareaModificada;
  } catch (err) {
    debug(chalk.redBright.bold("No se ha podido modificar la tarea"));
    const nuevoError = crearError(
      `No se ha podido modificar la tarea ${err.message}`
    );
    throw err.codigo ? err : nuevoError;
  }
};

const eliminarTarea = async (idTarea) => {
  try {
    const tareaEliminada = await Tarea.findByIdAndDelete(idTarea);
    if (!tareaEliminada) {
      throw crearError("No existe la tarea a eliminar", 404);
    }
    return tareaEliminada;
  } catch (err) {
    debug(chalk.redBright.bold("No se ha podido eliminar la tarea"));
    const nuevoError = crearError(
      `No se ha podido eliminar la tarea ${err.message}`
    );
    throw err.codigo ? err : nuevoError;
  }
};

module.exports = {
  listarTareas,
  eliminarTarea,
  modificarTarea,
  obtenerTarea,
  crearTarea,
};
