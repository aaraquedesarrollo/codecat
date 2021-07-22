const express = require("express");
const { check } = require("express-validator");
const {
  crearHistorial,
  anyadirTrabajoAlHistorial,
  anyadirTareaHistorialTrabajo,
  comprobarHistorialUsuario,
  obtenerTareasTrabajo,
  comprobarTrabajoRepetido,
} = require("../../bd/controladores/historialController");
const { authMiddleware, validarErrores } = require("../middlewares");

const router = express.Router();

// Ruta para obtener listado de tareas segun el trabajo
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
// ruta para comprobar que el usuario tiene historial
router.get("/comprobar-historial", authMiddleware, async (req, res, next) => {
  try {
    const { idUsuario } = req;
    const historial = await comprobarHistorialUsuario(idUsuario);
    res.status(201).json(historial);
  } catch (err) {
    next(err);
  }
});

router.post("/crear-historial", authMiddleware, async (req, res, next) => {
  try {
    const { idUsuario } = req;
    const historialCreado = await crearHistorial(idUsuario);
    res.status(201).json(historialCreado);
  } catch (err) {
    next(err);
  }
});

// Añade una tarea al trabajo del historial, si no existe el trabajo lo crea tambien
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
      const existeTrabajo = await comprobarTrabajoRepetido(
        idUsuario,
        idTrabajo
      );
      if (!existeTrabajo) {
        await anyadirTrabajoAlHistorial(idUsuario, idTrabajo);
      }
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
