const express = require("express");
const { check } = require("express-validator");
const {
  crearHistorial,
  anyadirTrabajoAlHistorial,
  anyadirTareaHistorialTrabajo,
  comprobarHistorialUsuario,
  comprobarTrabajoRepetido,
} = require("../../bd/controladores/historialController");
const {
  obtenerRecompensaTarea,
} = require("../../bd/controladores/tareaController");
const {
  modificarUsuario,
} = require("../../bd/controladores/usuarioController");
const { authMiddleware, validarErrores } = require("../middlewares");

const router = express.Router();

// ruta para comprobar que el usuario tiene las tareas en el historial

/* router.get(
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
); */

router.post("/crear-historial", authMiddleware, async (req, res, next) => {
  try {
    const { idUsuario } = req;
    const existeHistorial = await comprobarHistorialUsuario(idUsuario);
    if (!existeHistorial) {
      await crearHistorial(idUsuario);
      res
        .status(201)
        .json({ error: false, mensaje: "Creado historial para el usuasio" });
    } else {
      res.json({ error: false, mensaje: "El usuario ya tiene historial" });
    }
  } catch (err) {
    next(err);
  }
});

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
      const { experiencia, chuches } = await obtenerRecompensaTarea(idTarea);
      modificarUsuario(idUsuario, { $inc: { experiencia, chuches } });
      res.json(historialModificado);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
