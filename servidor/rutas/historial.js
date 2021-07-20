const express = require("express");
const {
  crearHistorial,
  anyadirTrabajoAlHistorial,
  anyadirTareaHistorialTrabajo,
  comprobarHistorialUsuario,
  obtenerTareasTrabajo,
} = require("../../bd/controladores/historialController");
const { authMiddleware } = require("../middlewares");

const router = express.Router();

// ruta para comprobar que el usuario tiene historial
router.get(
  "/comprobar-tareas/:idTrabajo",
  authMiddleware,
  async (req, res, next) => {
    try {
      const { idUsuario } = req;
      const { idTrabajo } = req.params;
      const tareas = await obtenerTareasTrabajo(idUsuario, idTrabajo);
      res.status(200).json(tareas);
    } catch (err) {
      next(err);
    }
  }
);
// Ruta para obtener listado de tareas segun el trabajo
router.get("/comprobar-historial", authMiddleware, async (req, res, next) => {
  try {
    const { idUsuario } = req;
    const historial = await comprobarHistorialUsuario(idUsuario);
    res.status(201).json(historial);
  } catch (err) {
    next(err);
  }
});
// BORRAR, ESTO IRA CUANDO SE AÑADE UNA TAREA
router.post("/crear-historial", authMiddleware, async (req, res, next) => {
  try {
    const { idUsuario } = req;
    const historialCreado = await crearHistorial(idUsuario);
    res.status(201).json(historialCreado);
  } catch (err) {
    next(err);
  }
});

// BORRAR, ESTO IRA CUANDo SE AÑADE UNA TAREA
router.put(
  "/anyadir-trabajo/:idTrabajo",
  authMiddleware,
  async (req, res, next) => {
    try {
      const { idTrabajo } = req.params;
      const { idUsuario } = req;
      const historialModificado = await anyadirTrabajoAlHistorial(
        idUsuario,
        idTrabajo
      );
      res.json(historialModificado);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/anyadir-tarea/:idTrabajo/:idTarea",
  authMiddleware,
  async (req, res, next) => {
    try {
      const { idTrabajo, idTarea } = req.params;
      const { idUsuario } = req;
      const historialModificado = await anyadirTareaHistorialTrabajo(
        idUsuario,
        idTrabajo,
        idTarea
      );
      res.json(historialModificado);
    } catch (err) {
      next(err);
    }
  }
);

// al hacer click en el trabajo, se añade el trabajo al historial del usuario

// cuando completas una tarea, se añade a la lista de tareas

// al finalizar todas las tareas se pone el trabajo como completado

module.exports = router;
