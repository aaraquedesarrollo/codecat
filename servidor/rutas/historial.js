const express = require("express");
const {
  crearHistorial,
  anyadirTrabajoAlHistorial,
  anyadirTareaHistorialTrabajo,
} = require("../../bd/controladores/historialController");
const { authMiddleware } = require("../middlewares");

const router = express.Router();

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
