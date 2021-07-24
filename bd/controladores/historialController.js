const { crearError } = require("../../servidor/errores");
const Historial = require("../modelos/Historial");

const crearHistorial = async (idUsuario) => {
  try {
    const historialCreado = await Historial.create({ idUsuario });
    return historialCreado;
  } catch (err) {
    throw crearError(`Ha habido un error creando el historial ${err.message}`);
  }
};

const comprobarHistorialUsuario = async (idUsuario) => {
  try {
    const historialCreado = await Historial.findOne({ idUsuario });
    return historialCreado;
  } catch (err) {
    throw crearError("Ha habido un error comprobando el historial");
  }
};

const comprobarTrabajoRepetido = async (idUsuario, idTrabajo) => {
  try {
    const historial = await Historial.findOne({
      idUsuario,
    });
    if (!historial) {
      return false;
    }
    const { trabajos: listadoTrabajos } = historial;
    const repetido = listadoTrabajos.some((trabajo) =>
      trabajo.idTrabajo.equals(idTrabajo)
    );
    return repetido;
  } catch (err) {
    throw crearError("No se han podido comprobar los trabajos repetidos");
  }
};

const anyadirTrabajoAlHistorial = async (idUsuario, idTrabajo) => {
  try {
    const historialModificado = await Historial.findOneAndUpdate(
      { idUsuario },
      {
        $push: {
          trabajos: {
            idTrabajo,
            tareasCompletadas: [],
            trabajoCompletado: false,
          },
        },
      }
    );
    return historialModificado;
  } catch (err) {
    throw err.codigo
      ? err
      : crearError("Ha habido un error añadiendo el trabajo al historial");
  }
};

const anyadirTareaHistorialTrabajo = async (idUsuario, idTrabajo, idTarea) => {
  try {
    const historialModificado = await Historial.findOneAndUpdate(
      {
        idUsuario,
        "trabajos.idTrabajo": idTrabajo,
      },
      {
        $addToSet: { "trabajos.$.tareasCompletadas": idTarea },
      }
    );
    return historialModificado;
  } catch (err) {
    throw crearError(
      `No se ha podido añadir la tarea al historial de trabajos ${err.message}`
    );
  }
};
/* const obtenerTareasTrabajo = async (idUsuario, idTrabajo) => {
  try {
    const historial = await Historial.findOne({
      idUsuario,
      "trabajos.idTrabajo": idTrabajo,
    });
    const tareasCompletadas = historial.trabajos
      .filter((trabajo) => trabajo.tareasCompletadas.lentgh !== 0)
      .map((trabajos) => trabajos.tareasCompletadas); 
    console.log(tareasCompletadas);
    return tareasCompletadas;
  } catch (err) {
    throw crearError(`No se a podido obtener las tareas ${err.message}`);
  } 
}; */
const completarTrabajo = async (idUsuario, idTrabajo) => {
  try {
    const trabajoCompletado = await Historial.findOneAndUpdate(
      {
        idUsuario,
        "trabajos.idTrabajo": idTrabajo,
      },
      {
        "trabajos.trabajoCompletado": true,
      }
    );
    return trabajoCompletado;
  } catch (err) {
    throw crearError(`No se a podido completar el trabajo ${err.message}`);
  }
};
module.exports = {
  crearHistorial,
  comprobarTrabajoRepetido,
  comprobarHistorialUsuario,
  anyadirTrabajoAlHistorial,
  anyadirTareaHistorialTrabajo,
  completarTrabajo,
};
