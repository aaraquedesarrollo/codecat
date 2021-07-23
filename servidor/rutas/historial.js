const express = require("express");
const { check } = require("express-validator");
const {
  crearHistorial,
  anyadirTrabajoAlHistorial,
  anyadirTareaHistorialTrabajo,
  comprobarHistorialUsuario,
  obtenerTareasTrabajo,
} = require("../../bd/controladores/historialController");
const { authMiddleware, validarErrores } = require("../middlewares");

const router = express.Router();

// ruta para comprobar que el usuario tiene las tareas en el historial
router.get(
  "/comprobar-tareas/:idTrabajo",
  check("idTrabajo", "Id de trabajo incorrecta").isMongoId(),
  validarErrores,
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
  check("idTrabajo", "Id de trabajo incorrecta").isMongoId(),
  validarErrores,
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
  check("idTrabajo", "Id de trabajo incorrecta").isMongoId(),
  check("idTarea", "Id de tarea incorrecta").isMongoId(),
  validarErrores,
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

module.exports = router;
